import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { detailsService } from '../../redux/apis/list';
import { clearDetailState } from '../../redux/features/list-slice';
import Layout from '../../components/layout';
import { HORIZONTAL_DIMENS, VERTICAL_DIMENS } from '../../constants/dimens';
import { colors, FONT_SIZE, FONT_WEIGHT } from '../../utils/theme';
import ListHeader from '../../components/Header/ListHeader';
import useCurrentLocation from '../../Hooks/useCurrentLocation';

const DetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { userId, userName } = route.params;
  const { detailItem, isDetailLoading, detailError } = useSelector(state => state.list);
  const { location, loading, error } = useCurrentLocation();

  useEffect(() => {

    dispatch(detailsService(userId));

    return () => {
      dispatch(clearDetailState());
    };
  }, [dispatch, userId]);


  useEffect(() => {
    if (detailError) {
      Alert.alert("Error", detailError, [{ text: "OK" }]);
    }
  }, [detailError]);


  useEffect(() => {
    navigation.setOptions({
      headerTitle: userName || 'Details',
    });
  }, [navigation, userName]);


  const item = detailItem || {};

  if (isDetailLoading || loading) {
    return (
      <Layout>
        <ListHeader headerText="Details" />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Layout>
    );
  }


  const latitude = location?.latitude || null;
  const longitude = location?.longitude || null;

  return (
    <Layout isFrom={true}>

      <ListHeader headerText="Details" />
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.description}>
          {item?.description || "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary."}
        </Text>

        {latitude && longitude &&
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude, longitude }}
                title={userName || "Location"}
                description={item?.description || "Marker Location"}
              />
            </MapView>
          </View>
        }


        {latitude && longitude &&
          <>
            <Text style={styles.latLongText}>
              Current Lat/Long:
            </Text>
            <Text style={styles.latLongTextValue}>
              {`${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`}
            </Text>
          </>
        }

      </ScrollView>
    </Layout>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {

    paddingTop: VERTICAL_DIMENS._10,
    paddingBottom: VERTICAL_DIMENS._20,
  },
  title: {
    fontSize: FONT_SIZE._30,
    fontWeight: FONT_WEIGHT._600,
    marginBottom: VERTICAL_DIMENS._10,
    color: colors.color_1F1F1F,
  },
  description: {
    paddingHorizontal: HORIZONTAL_DIMENS._20,
    fontSize: FONT_SIZE._18,
    fontWeight: FONT_WEIGHT._400, 
    lineHeight: 26,
    textAlign: 'justify',
    color: colors.black,
    marginBottom: VERTICAL_DIMENS._20,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden', 
    marginBottom: VERTICAL_DIMENS._15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  latLongText: {
    fontSize: FONT_SIZE._18,
    fontWeight: FONT_WEIGHT._600,
    color: colors.color_263238,
    paddingHorizontal: HORIZONTAL_DIMENS._20,
  },
  latLongTextValue: {
    fontSize: FONT_SIZE._16,
    fontWeight: FONT_WEIGHT._400,
    color: colors.color_848484,
    paddingHorizontal: HORIZONTAL_DIMENS._20,
    marginTop: VERTICAL_DIMENS._5
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});