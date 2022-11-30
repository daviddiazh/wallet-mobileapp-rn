import { FC, useState } from 'react';
import { AccountContext } from './AccountContext';
import walletApi from '../../api/index';


export const AccountProvider: FC<any> = ({ children }: any) => {

    const [account, setAccount] = useState({});

    const findByUserId = async (id: string) => {
        try {
            const { data } = await walletApi.post('/account/findByUserId', {userId: id});

            setAccount(data);

        } catch (error) {
            console.log(error)
        }
    }

    const findByUserEmail = async (email: string) => {
        try {
            const { data } = await walletApi.post('/account/findByUserEmail', {userEmail: email});
            // console.log(data)

            setAccount(data);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AccountContext.Provider value={{
            account,

            findByUserId,
            findByUserEmail
        }}>
            { children }
        </AccountContext.Provider>
    )
}