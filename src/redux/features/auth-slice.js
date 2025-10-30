// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "../apis/auth";

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    token: null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logoutUser: () => initialState,

        clearError: (state) => {
            state.error = null;
            state.status = 'idle';
        }
    },
    extraReducers(builder) {
        builder

            .addCase(loginService.pending, (state) => {
                state.isLoading = true;
                state.status = 'loading';
                state.error = null;
            })

            .addCase(loginService.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.isLoading = false;
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.error = null;
            })

            .addCase(loginService.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.error = action.payload?.error || 'Login failed due to an unknown error.';
            });
    },
});

export const { logoutUser, clearError } =
    authSlice.actions;
export default authSlice.reducer;