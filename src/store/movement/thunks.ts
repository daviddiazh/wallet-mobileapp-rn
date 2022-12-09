import { loadingMovementsReducer, myMovementsByAccountIdReducer } from "./movementSlice";
import { MYMOVEMENTSBYACCOUNTID_MOVEMENT } from '../../graphql/queries';
import { apolloClient } from '../../graphql/apolloClient';


export const loadingMovement_thunk = () => {
    return async ( dispatch: any ) => {

        dispatch( loadingMovementsReducer() );
    }
};


export const myMovementsByAccountId_thunk = (id: string) => {
    return async ( dispatch: any ) => {

        dispatch( loadingMovementsReducer() );

        const { data: { myMovementsByAccountId } } = await apolloClient.query({
            query: MYMOVEMENTSBYACCOUNTID_MOVEMENT,
            variables: {
                myMovementsByAccountId: id
            },
        });

        dispatch( myMovementsByAccountIdReducer( myMovementsByAccountId ) );
    }
};