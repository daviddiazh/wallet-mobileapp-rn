import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'not-authenticated', // 'checking', 'authenticated', 'not-authenticated'
    user: {},
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
            console.log({ payload })

            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
    }
});

export const { checkingReducer, signInReducer, } = authSlice.actions;