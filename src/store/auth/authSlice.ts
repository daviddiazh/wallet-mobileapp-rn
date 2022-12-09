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

        addError: ( state, { payload } ) => {
            //TODO ...
        },
    }
});

export const { checkingReducer, signInReducer, addError } = authSlice.actions;