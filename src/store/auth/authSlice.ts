import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'not-authenticated', // 'checking', 'authenticated', 'not-authenticated'
    user: {},
    token: undefined,
    errorMessage: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkingReducer: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },

        signInReducer: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload.user;
            state.token = payload.token;
            state.errorMessage = undefined;
        },

        logoutReducer: ( state ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = undefined;
        },

        addErrorReducer: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.token = undefined;
            state.errorMessage = payload;
        },

        clearErrorReducer: ( state ) => {
            state.errorMessage = undefined;
        },
    }
});

export const { 
    checkingReducer, 
    signInReducer, 
    logoutReducer, 
    addErrorReducer,
    clearErrorReducer
} = authSlice.actions;