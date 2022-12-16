import { gql } from '@apollo/client';

/** 
 ** Account
*/

export const FINDACCOUNTBYUSERID_ACCOUNT = gql`
    query FindByUserId($findByUserId: ID!) {
        findByUserId(id: $findByUserId) {
            ... on AccountGQLFBUI {
                _id
                balance
            }
            ... on StatusError {
                code
                title
                description
            }
        }
    }
`;


export const MYMOVEMENTSBYACCOUNTID_MOVEMENT = gql`
    query MyMovementsByAccountId($myMovementsByAccountId: String!) {
        myMovementsByAccountId(id: $myMovementsByAccountId) {
            accountId_Income
            accountId_Outcome
            reason
            amount
            createdAt
        }
    }
`;


/** 
 ** Auth
*/

export const CHECKTOKEN_QUERY = gql`
    query CheckToken($token: String!) {
        checkToken(token: $token) {
            ... on SignUpOrLogin {
                user {
                    _id
                    fullName
                    profilePicture
                }
                token
            }
            ... on StatusError {
                code
                title
                description
            }
        }
    }
`;