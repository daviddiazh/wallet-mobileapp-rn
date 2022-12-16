import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagePickerResponse } from 'react-native-image-picker';
import { addErrorReducer, checkingReducer, logoutReducer, signInReducer, updatePictureReducer } from './authSlice';
import { apolloClient } from '../../graphql/apolloClient';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../../graphql/mutations';
import { CHECKTOKEN_QUERY } from '../../graphql/queries';
import walletApi from '../../api';

interface SignUpProps {
    fullName: string;
    phone: string; 
    email: string; 
    password: string;
    profilePicture?: string;
}

export const signUp_thunk = ({ fullName, email, password, phone }: SignUpProps) => {
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
                }
            }
        })

        if ( signUp.code ) {
            return dispatch( addErrorReducer( signUp ) );
        }

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
            return dispatch( addErrorReducer( login ) );
        }

        dispatch( signInReducer( login ) );

        await AsyncStorage.setItem('token', login.token);

    }
}


export const checkToken_thunk = ( token: string ) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );

        const { data: { checkToken } } = await apolloClient.query({
            query: CHECKTOKEN_QUERY,
            variables: {
                token
            },
        });

        if ( checkToken.code ) {
            return dispatch( addErrorReducer( checkToken ) );
        }

        await AsyncStorage.setItem('token', checkToken.token);
        
        dispatch( signInReducer( checkToken ) );

    }
}


export const logout_thunk = () => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );
        
        await AsyncStorage.removeItem('token');
        
        dispatch( logoutReducer() );

    }
}


export const updatePicture_thunk = ( id: string, picture: any ) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );
        
        const imageToUpload = {
            uri: picture.assets[0].uri,
            type: picture.assets[0].type,
            name: picture.assets[0].fileName
        }

        const formData = new FormData();
        formData.append('profilePicture', imageToUpload);

        try {
            const { data } = await walletApi.put(`/user/updatePicture/${ id }`, formData );

            dispatch( updatePictureReducer(data) )
            return data;
        } catch( error ) {
            console.log(error)
        }

    }
}