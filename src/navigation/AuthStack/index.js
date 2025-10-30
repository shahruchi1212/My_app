import React from 'react';
import LoginScreen from '../../screens/Auth/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <React.Fragment>
            <Stack.Navigator
                initialRouteName={'Login'}
                screenOptions={{
                    orientation: 'portrait',
                    headerShown: false
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />

            </Stack.Navigator>
        </React.Fragment>
    );
};

export default AuthStack;
