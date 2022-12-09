import { useMutation } from '@apollo/client';
import { checkingReducer, signInReducer } from './authSlice';
import { apolloClient } from '../../graphql/apolloClient';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../../graphql/mutations';

export const checkingAuthentication = () => {
    return async( dispatch: any ) => {

        dispatch( checkingReducer() );
    }
}


interface SignUpProps {
    fullName: string;
    phone: string; 
    email: string; 
    password: string;
    profilePicture?: string;
}

export const signUp_thunk = ({fullName, email, password, phone}: SignUpProps) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );
        
        const cellphone = parseInt( phone );

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

        dispatch( signInReducer( signUp ) );

    }
}


interface LoginProps {
    email: string;
    password: string;
}

export const login_thunk = ({email, password}: LoginProps) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );

        const { data: { login } } = await apolloClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
                login: {
                    email,
                    password,
                },
            },
        });

        dispatch( signInReducer( login ) );

    }
}

