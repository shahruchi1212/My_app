// rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. IMPORT YOUR REDUCERS
import authReducer from './features/auth-slice';
import listReducer from './features/list-slice'; 


const authReducerConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['isLoggedIn', 'token'],
  blacklist: ['isLoading', 'status', 'error'], 
};

const appReducer = combineReducers({
  auth: persistReducer(authReducerConfig, authReducer),
  list: listReducer, 
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;