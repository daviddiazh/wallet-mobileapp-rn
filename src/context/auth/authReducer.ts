import { IUser } from '../../interfaces/user.interface';

export interface AuthState {
    userStatus: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    error: string | null;
    user: IUser | null;
}

type AuthActionTypes = 
    |   { type: 'signUp - ActionType', payload: { user: IUser, token: string, } }
    |   { type: 'addError - ActionType', payload: Object }
    |   { type: 'removeError - ActionType' }
    |   { type: 'notAuthenticated - ActionType' } 
    |   { type: 'logout - ActionType' }

export const authReducer = ( state: AuthState, action: AuthActionTypes ): AuthState => {

    switch( action.type ){
       case 'addError - ActionType':
           return {
               ...state,
               user: null,
               userStatus: 'not-authenticated',
               token: null,
            //    error: action.payload,
            //    error: 'CHANGE IN authReducer the error property',
           }

        case 'removeError - ActionType':
            return {
                ...state,
                error: '',
            }

        case 'signUp - ActionType': 
            return {
                ...state,
                error: null,
                userStatus: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
            }

        case 'logout - ActionType':
        case 'notAuthenticated - ActionType':
            return {
                ...state,
                userStatus: 'not-authenticated',
                token: null,
                user: null,
            }

        default:
           return state;
    }

}