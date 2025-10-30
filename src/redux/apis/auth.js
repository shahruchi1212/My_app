import {createAsyncThunk} from '@reduxjs/toolkit';
import API_PATHs from '../../networking/apiPath';

import HttpServiceClass from '../../networking/httpService';

let API = new HttpServiceClass();


export const loginService = createAsyncThunk(
    'auth/login',
    async (values, {rejectWithValue}) => {
      try {
        const response = await API.post(API_PATHs.AUTH.LOGINAPI, {
          data: values,
        });
        return response;
      } catch (error) {
        return rejectWithValue({
          ...error,
        });
      }
    },
  );