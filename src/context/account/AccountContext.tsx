import { createContext } from 'react'
import { IAccount } from '../../interfaces/account.interface';

interface ContextProps {
    account: IAccount;

    findByUserId: (id: any) => void;
    findByUserEmail: (email: string) => void
}

export const AccountContext = createContext({} as ContextProps);