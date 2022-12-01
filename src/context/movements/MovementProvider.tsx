import { FC, useState } from 'react';
import { MovementContext } from './MovementContext';
import walletApi from '../../api';
import { IMovement } from '../../interfaces/movement.interface';

export interface MovementState{
    movements: IMovement | IMovement[];
}

export const MovementsProvider: FC<any> = ({ children }: any) => {

    const [movements, setMovements] = useState([])

    const myMovementsByAccountId = async (id: string) => {
        try {
            const { data } = await walletApi.post('/movement/myMovementsByAccountId', { id });
            // console.log('MOVEMENTS IN PROVIDER: ', data)

            setMovements(data);
        } catch (error) {
            console.log(error);
        }

    }

    const requestCredit = async (accountId_Income: string, amount: string, reason: string) => {
        const numberAmount = parseInt(amount)
        const { data } = await walletApi.post('/movement/requestCredit', { accountId_Income, amount: numberAmount, reason });
        // console.log('requestCredit: ', data)

        return data;
    }
    
    const moneyTransfer = async (accountId_Income: string, accountId_Outcome: string, reason: string, amount: string) => {
        console.log('amount: ', amount)
        const numberAmount = parseInt(amount)
        console.log('numberAmount: ', numberAmount)
        console.log('typeof numberAmount: ', typeof numberAmount)
        const { data } = await walletApi.post('/movement/moneyTransfer', { accountId_Income, accountId_Outcome, amount: numberAmount, reason });
        console.log('moneyTransfer: ', data)

        return data;
    }

    return (
        <MovementContext.Provider value={{
            movements,

            myMovementsByAccountId,
            requestCredit,
            moneyTransfer
        }}>
            { children }
        </MovementContext.Provider>
    )
}