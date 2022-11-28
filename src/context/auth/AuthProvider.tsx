import { useReducer } from "react";
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

    const checkToken = () => {
        try {
            
        } catch (error) {
            
        }
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

            console.log('LOGINNNNN', {data})
            return;
        } catch (error: any) {
            console.log('ERROR: ', error.data.message)
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

    return (
        <AuthContext.Provider
            value={{
                ...state,

                checkToken,
                login,
                // signUp,
                logout,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}