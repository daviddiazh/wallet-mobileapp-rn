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
                phone
                email
            }
            token
        }
    }
`