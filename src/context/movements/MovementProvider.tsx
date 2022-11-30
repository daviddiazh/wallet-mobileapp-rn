import { FC, useReducer, useState } from 'react';
import { MovementContext } from './MovementContext';
import { IMovement } from '../../interfaces/movement.interface';
import walletApi from '../../api';

export interface MovementState{
    movements: IMovement | IMovement[];
}

// const MOVEMENTS_INITIAL_STATE: MovementState = {
//     movements: [],
// }

export const MovementsProvider: FC<any> = ({ children }: any) => {

    // const [ state, dispatch ] = useReducer(movementsReducer, MOVEMENTS_INITIAL_STATE);

    const [movements, setMovements] = useState([])

    const myMovementsByAccountId = async (id: string) => {
        try {
            const { data } = await walletApi.post('/movement/myMovementsByAccountId', { id });
            console.log('MOVEMENTS IN PROVIDER: ', data)

            setMovements(data);
        } catch (error) {
            console.log(error);
        }

    }

    const requestCredit = (accountId_Income: string, amount: number, reason: string) => {

    }
    
    const moneyTransfer = (accountId_Income: string, accountId_Outcome: string, reason: string, amount: number) => {

    }

    return (
        <MovementContext.Provider value={{
            // ...state,
            movements,

            myMovementsByAccountId,
            requestCredit,
            moneyTransfer
        }}>
            { children }
        </MovementContext.Provider>
    )
}