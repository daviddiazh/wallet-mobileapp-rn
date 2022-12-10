import { useMutation } from '@apollo/client';
import { addErrorReducer, checkingReducer, logoutReducer, signInReducer } from './authSlice';
import { apolloClient } from '../../graphql/apolloClient';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../../graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHECKTOKEN_QUERY } from '../../graphql/queries';

// export const checkingAuthentication = () => {
//     return async( dispatch: any ) => {

//         dispatch( checkingReducer() );
//     }
// }


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

        await AsyncStorage.setItem('token', signUp.token);

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

        if ( login.code ) {
            return dispatch( addErrorReducer( login.description ) );
        }

        dispatch( signInReducer( login ) );

        await AsyncStorage.setItem('token', login.token);

    }
}


export const checkToken_thunk = ( token: string ) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );

        // const { data: { checkToken } } = await apolloClient.query({
        const resp = await apolloClient.query({
            query: CHECKTOKEN_QUERY,
            variables: {
                token
            },
        }).then().catch(error => console.log({error}))
        console.log('resp: ', resp)

        // await AsyncStorage.setItem('token', data.checkToken.token);
        
        // dispatch( signInReducer( data.checkToken ) );

    }
}


export const logout_thunk = () => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );
        
        await AsyncStorage.removeItem('token');
        
        dispatch( logout_thunk() );

    }
}