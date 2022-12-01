import { createContext } from 'react'
import { IMovement } from '../../interfaces/movement.interface';

interface ContextProps {
    movements: IMovement[];

    myMovementsByAccountId: (accountId: string) => void;
    requestCredit: (accountId_Income: string, amount: string, reason: string) => void;
    moneyTransfer: (accountId_Income: string, accountId_Outcome: string, reason: string, amount: string) => void;
}

export const MovementContext = createContext({} as ContextProps);