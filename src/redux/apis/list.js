import {createAsyncThunk} from '@reduxjs/toolkit';
import API_PATHs from '../../networking/apiPath';

import HttpServiceClass from '../../networking/httpService';

let API = new HttpServiceClass();


export const listService = createAsyncThunk(
    'list/fetchList',
    async ({ skip, limit }, { rejectWithValue }) => {
        try {
            const response = await API.get(API_PATHs.USER.LISTAPI, {
                params: { 
                    skip, 
                    limit 
                },
            });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const detailsService = createAsyncThunk(
    'list/fetchDetails',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.get(`${API_PATHs.USER.DETAILAPI}${userId}`);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);