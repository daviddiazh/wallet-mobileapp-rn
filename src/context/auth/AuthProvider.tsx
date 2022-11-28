import { useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import { authReducer, AuthState } from "./authReducer";
import walletApi from '../../api/index';
import { LoginResponse, IUser } from '../../interfaces/user.interface';


const AUTH_INITIAL_STATE: AuthState = {
    userStatus: 'checking',
    token: null,
    user: null,
    error: null,
}


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')

        if( !token ) return dispatch({type: 'notAuthenticated - ActionType'});

        const resp = await walletApi.get('/auth/checkToken', {
            headers: {
                ['x-token']: token
            }
        });
        console.log('resp: ', {resp})
        if( resp.status === 401 || resp.data.message === 'Su token ha expirado o no hay token en la petición' ) {
            return dispatch({type: 'notAuthenticated - ActionType'});
        }
        console.log('resp.data: ', resp.data)

        await AsyncStorage.setItem('token', resp.data.token);

        dispatch({
            type: 'signUp - ActionType',
            payload: {
                token: resp.data.token,
                user: resp.data.user
            }
        });
        
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

            await AsyncStorage.setItem('token', data.token);

            return data;
        } catch (error: any) {
            dispatch({type: 'addError - ActionType', payload: 'Usuario y/o contraseña incorrectos.'}); //TODO: CHANGE PAYLOAD
            console.log('ERROR: ', error);
        }
    };

    const signUp = async ( fullName: string, phone: number | string, email: string, password: string, ) => {
        try {
            const { data } = await walletApi.post('/auth/signUp', { fullName, phone, email, password });

            dispatch({
                type: 'signUp - ActionType', 
                payload: {
                    token: data.token,
                    user: data.user,
                }
            });

            await AsyncStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout - ActionType' })
    };

    const removeError = () => {
        dispatch({type: 'removeError - ActionType'});
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,

                login,
                signUp,
                logout,
                removeError
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}