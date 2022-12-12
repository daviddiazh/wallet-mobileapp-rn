import { createSlice } from '@reduxjs/toolkit';
import { IMovement } from '../../interfaces/movement.interface';

interface InitialState {
    movements: IMovement[],
    isLoadingMovements: boolean,
    titleError: string | undefined;
    errorMessage: string | undefined,
}

const initialState: InitialState = {
    movements: [],
    isLoadingMovements: false,
    titleError: undefined,
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
            state.titleError = undefined,
            state.errorMessage = undefined;
        },

        addErrorMovementReducer: ( state, { payload } ) => {
            state.titleError = payload.title,
            state.errorMessage = payload.description;
        },

        clearErrorMovementReducer: ( state ) => {
            state.titleError = undefined;
            state.errorMessage = undefined;
        },
    }
});

export const { 
    loadingMovementsReducer, 
    myMovementsByAccountIdReducer, 
    addErrorMovementReducer,
    clearErrorMovementReducer,
} = movementSlice.actions;