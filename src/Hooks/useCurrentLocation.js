import { useState, useEffect, useCallback } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Alert, Platform, Linking } from 'react-native';
import { 
    check, 
    request, 
    openSettings, 
    PERMISSIONS, 
    RESULTS 
} from 'react-native-permissions';


const useCurrentLocation = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const LOCATION_PERMISSION = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        default: null,
    });

    const showPermissionDeniedAlert = useCallback((message) => {
        Alert.alert(
            "Location Required",
            message,
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Open Settings", 
                    onPress: () => {
                        openSettings().catch(() => {
                            Alert.alert("Error", "Could not open settings. Please open manually.");
                        });
                    }
                }
            ]
        );
    }, []);

    const fetchCurrentPosition = useCallback(() => {
        setLoading(true);
        setError(null);

        Geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });
                setLoading(false);
            },
            (locationError) => {
             
                let errorMessage = 'Failed to get location.';
                if (locationError.code === 2) {
                    errorMessage = 'Location is currently disabled on your device. Please enable it.';
                } else if (locationError.code === 3) {
                    errorMessage = 'Request timed out while trying to get location.';
                }
                setError(errorMessage);
                setLoading(false);
                Alert.alert("Location Error", errorMessage, [{ text: "OK" }]);
            },
            { 
                enableHighAccuracy: false,
                timeout: 30000, 
                maximumAge: 1000
            } 
        );
    }, []);

    useEffect(() => {
        if (!LOCATION_PERMISSION) {
            setError("Location feature not supported on this platform.");
            setLoading(false);
            return;
        }

        const handleLocationFlow = async () => {
            let permissionStatus = await check(LOCATION_PERMISSION);

            if (permissionStatus === RESULTS.DENIED) {
                permissionStatus = await request(LOCATION_PERMISSION);
            }

            if (permissionStatus === RESULTS.GRANTED) {
                fetchCurrentPosition();
            } else if (permissionStatus === RESULTS.BLOCKED) {
                const deniedMessage = 'Location access is blocked. You must enable it manually in settings.';
                setError(deniedMessage);
                setLoading(false);
                showPermissionDeniedAlert(deniedMessage);
            } else {
                const unavailableMessage = 'Location permission check failed or is unavailable.';
                setError(unavailableMessage);
                setLoading(false);
                Alert.alert("Location Error", unavailableMessage, [{ text: "OK" }]);
            }
        };

        handleLocationFlow();

    }, [LOCATION_PERMISSION, fetchCurrentPosition, showPermissionDeniedAlert]);

    return { location, loading, error };
};

export default useCurrentLocation;