import { useMutation } from '@apollo/client';
import { checkingReducer, signInReducer } from './authSlice';
import { apolloClient } from '../../graphql/apolloClient';
import { SIGNUP_MUTATION } from '../../graphql/mutations';

interface SignUpProps {
    fullName: string, 
    phone: string, 
    email: string, 
    password: string
}

export const signUp_thunks = ({fullName, email, password, phone}: SignUpProps) => {
    return async ( dispatch: any ) => {

        const cellphone = parseInt( phone );

        dispatch( checkingReducer() );

        const { data: { signUp } } = await apolloClient.mutate({
            mutation: SIGNUP_MUTATION,
            variables: {
                signUp: {
                    fullName,
                    email,
                    password,
                    phone: cellphone,
                    // profilePicture: ''
                }
            }
        })

        dispatch( signInReducer( signUp.user ) );

    }
}