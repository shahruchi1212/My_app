import React from 'react';

import ListScreen from '../../screens/Main/ListScreen';
import DetailsScreen from '../../screens/Main/DetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <React.Fragment>
            <Stack.Navigator
                initialRouteName={'List'}
                screenOptions={{
                    orientation: 'portrait',
                    headerShown: false
                }}>
                <Stack.Screen name="List" component={ListScreen}/>
                <Stack.Screen name="Details" component={DetailsScreen}  />


            </Stack.Navigator>
        </React.Fragment>
    );
};

export default AppStack;
