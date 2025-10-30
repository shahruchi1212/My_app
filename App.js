import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persist, store } from './src/redux/store';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigation';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persist}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;