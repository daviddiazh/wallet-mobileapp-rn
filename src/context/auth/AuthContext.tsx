import { createContext } from "react";
import { IUser } from "../../interfaces/user.interface";

interface AuthContextProps {
    // isLoggedIn: boolean;
    user?: IUser | null;
    token: string | null;
    userStatus: 'checking' | 'authenticated' | 'not-authenticated';

    checkToken: () => void;
    login: ( email: string, password: string ) => Promise<void>;
    // signUp: ( fullName: string, phone: number, email: string, password: string, ) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);