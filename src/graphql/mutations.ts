import { gql } from '@apollo/client'

/** 
 ** Authentication
 */

 //TODO: re valitate token (persistence)

export const SIGNUP_MUTATION = gql`
    mutation SignUp($signUp: SignUpDto!) {
        signUp(signUp: $signUp) {
            user {
                id
                fullName
            }
            token
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation Login($login: LoginDtoGQL!) {
        login(login: $login) {
            user {
                id
                fullName
            }
            token
        }
    }
`