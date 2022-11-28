import { useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import { authReducer, AuthState } from "./authReducer";
import walletApi from '../../api/index';
import { LoginResponse } from '../../interfaces/user.interface';


const AUTH_INITIAL_STATE: AuthState = {
    userStatus: 'not-authenticated',
    token: null,
    user: null,
    error: null,
}


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    // useEffect(() => {
    //     checkToken(null)
    // }, [])
    

    const checkToken = async (endpoint: string) => {
        const token = await AsyncStorage.getItem('token')

        if( !token ) return dispatch({type: 'notAuthenticated - ActionType'});

        const resp = await walletApi.post(endpoint);
        if( resp.status === 401 ) {
            return dispatch({type: 'notAuthenticated - ActionType'});
        }

        dispatch({
            type: 'signUp - ActionType',
            payload: {
                token: resp.data.token,
                user: resp.data.user
            }
        })
        
    };

    const login = async ( email: string, password: string ) =>  {
        try {
            const { data } = await walletApi.post<LoginResponse>('/auth/login', { email, password });

            dispatch({
                type: 'signUp - ActionType', 
                payload: {
                    token: data.token,
                    user: data.user,
                }
            });

            await AsyncStorage.setItem('token', data.token)

            // return data;
            return ;
        } catch (error: any) {
            dispatch({type: 'addError - ActionType', payload: 'Usuario y/o contraseña incorrectos.'}); //TODO: CHANGE PAYLOAD
            console.log('ERROR: ', error);
        }
    };

    const signUp = ( fullName: string, phone: number, email: string, password: string, ) => {
        try {
            
            return;
        } catch (error) {
            
        }
    };

    const logout = () => {
        try {
            
        } catch (error) {
            
        }
    };

    const removeError = () => {
        dispatch({type: 'removeError - ActionType'});
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,

                login,
                // signUp,
                logout,
                removeError
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}