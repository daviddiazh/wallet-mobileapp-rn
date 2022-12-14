import { createContext } from "react";
import { IUser } from "../../interfaces/user.interface";

interface AuthContextProps {
    // isLoggedIn: boolean;
    user?: IUser | null;
    token: string | null;
    userStatus: 'checking' | 'authenticated' | 'not-authenticated';
    error: string | null;

    login: ( email: string, password: string ) => void;
    signUp: ( fullName: string, phone: string | number, email: string, password: string, ) => void;
    logout: () => void;
    removeError: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);