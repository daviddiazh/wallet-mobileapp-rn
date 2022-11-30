import { MovementState } from './MovementProvider';
import { IMovement } from '../../interfaces/movement.interface';

type MovementActionTypes = 
|   { type: 'myMovementsByAccountId - ActionType', payload: IMovement[] }
|   { type: 'requestCredit - ActionType', payload: { accountId_Income: string, amount: number, reason: string } }
|   { type: 'moneyTransfer - ActionType', payload: { accountId_Income: string, accountId_Outcome: string, reason: string, amount: number } }

export const movementReducer = ( state: MovementState, action: MovementActionTypes ): MovementState => {

    switch( action.type ){
       case 'myMovementsByAccountId - ActionType':
           return {
               ...state,
               movements: action.payload
           }

       default:
           return state;
    }

}