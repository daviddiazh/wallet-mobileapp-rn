import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { findAccountByUserId_thunk } from '../account/thunks';
import { myMovementsByAccountId_thunk } from '../movement/thunks';

const initialState = {
    status: 'not-authenticated', // 'checking', 'authenticated', 'not-authenticated'
    user: {},
    token: undefined,
    titleError: undefined,
    errorMessage: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkingReducer: ( state ) => {
            state.status = 'checking';
            state.titleError = undefined;
            state.errorMessage = undefined;
        },

        signInReducer: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload.user;
            state.token = payload.token;
            state.titleError = undefined;
            state.errorMessage = undefined;
        },

        logoutReducer: ( state ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.titleError = undefined;
            state.errorMessage = undefined;
        },

        addErrorReducer: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.token = undefined;
            state.titleError = payload.title;
            state.errorMessage = payload.description;
        },

        clearErrorReducer: ( state ) => {
            state.status = 'not-authenticated';
            state.titleError = undefined;
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