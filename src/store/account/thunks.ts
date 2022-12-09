import { findAccountByUserIdReducer, loadingAccountReducer } from "./accountSlice";
import { FINDACCOUNTBYUSERID_ACCOUNT } from '../../graphql/queries';
import { apolloClient } from '../../graphql/apolloClient';


export const loadingAccount_thunk = () => {
    return async ( dispatch: any ) => {

        dispatch( loadingAccountReducer() );
    }
}

export const findAccountByUserId_thunk = ( id: string ) => {
    return async ( dispatch: any ) => {

        dispatch( loadingAccountReducer() );
        const { data: { findByUserId } } = await apolloClient.query({
            query: FINDACCOUNTBYUSERID_ACCOUNT,
            variables: {
                findByUserId: id
            },
        });

        dispatch( findAccountByUserIdReducer( findByUserId ) );

    }
}