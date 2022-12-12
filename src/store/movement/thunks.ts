import { addErrorMovementReducer, loadingMovementsReducer, myMovementsByAccountIdReducer } from "./movementSlice";
import { MYMOVEMENTSBYACCOUNTID_MOVEMENT } from '../../graphql/queries';
import { apolloClient } from '../../graphql/apolloClient';
import { REQUESTCREDIT_MUTATION, MONEYTRANSFER_MUTATION } from '../../graphql/mutations';


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


interface ReqCreditProps {
    accountId_Income: string, 
    amount: string, 
    reason: string
}

export const requestCredit_thunk = ({
    accountId_Income,
    amount,
    reason
}: ReqCreditProps) => {
    return async ( dispatch: any ) => {

        dispatch( loadingMovementsReducer() );

        const numberAmount = parseInt(amount);

        const { data } = await apolloClient.mutate({
            mutation: REQUESTCREDIT_MUTATION,
            variables: {
                requestCredit: {
                    accountId_Income,
                    amount: numberAmount,
                    reason,
                }
            },
        });

        console.log({ data })

    }
};


interface MoneyTransferProps {
    accountId_Income: string, 
    accountId_Outcome: string, 
    amount: string, 
    reason: string
}

export const moneyTransfer_thunk = ({
    accountId_Income,
    accountId_Outcome,
    amount,
    reason
}: MoneyTransferProps) => {
    return async ( dispatch: any ) => {

        dispatch( loadingMovementsReducer() );

        const numberAmount = parseInt(amount)

        const { data: { moneyTransfer } } = await apolloClient.mutate({
            mutation: MONEYTRANSFER_MUTATION,
            variables: {
                moneyTransfer: {
                    accountId_Income,
                    accountId_Outcome,
                    amount: numberAmount,
                    reason,
                }
            },
        });

        if( moneyTransfer.code ){
            dispatch( addErrorMovementReducer( moneyTransfer ) )
        }

    }
};