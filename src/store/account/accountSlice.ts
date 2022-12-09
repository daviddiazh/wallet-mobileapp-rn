import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    account: {},
    isLoadingAccount: false,
    errorMessage: undefined,
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        loadingAccountReducer: ( state ) => {
            state.isLoadingAccount = true;
        },

        findAccountByUserIdReducer: ( state, { payload } ) => {
            console.log('PAYLOADDDD: ', payload);

            state.account = payload;
            state.isLoadingAccount = false;
            state.errorMessage = undefined;
        },

        addErrorAccountReducer: ( state, { payload } ) => {
            //TODO ...
        },
    }
});

export const { 
    loadingAccountReducer, 
    findAccountByUserIdReducer, 
    addErrorAccountReducer 
} = accountSlice.actions;