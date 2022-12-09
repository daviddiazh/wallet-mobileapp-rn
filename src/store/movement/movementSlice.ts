import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movements: [],
    isLoadingMovements: false,
    errorMessage: undefined,
}

export const movementSlice = createSlice({
    name: 'movement',
    initialState,
    reducers: {
        loadingMovementsReducer: ( state ) => {
            state.isLoadingMovements = true;
        },

        myMovementsByAccountIdReducer: ( state, { payload } ) => {
            state.movements = payload;
            state.isLoadingMovements = false;
            state.errorMessage = undefined;
        },

        addErrorAccountReducer: ( state, { payload } ) => {
            //TODO ...
        },
    }
});

export const { 
    loadingMovementsReducer, 
    myMovementsByAccountIdReducer, 
    addErrorAccountReducer 
} = movementSlice.actions;