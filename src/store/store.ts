import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { accountSlice } from './account/accountSlice';
import { movementSlice } from './movement/movementSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        account: accountSlice.reducer,
        movement: movementSlice.reducer,
    }
});