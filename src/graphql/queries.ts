import { gql } from '@apollo/client';

export const FINDACCOUNTBYUSERID_ACCOUNT = gql`
    query Query($findByUserId: ID!) {
        findByUserId(id: $findByUserId) {
            balance
            _id
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


export const CHECKTOKEN_QUERY = gql`
    query Query($token: String!) {
        checkToken(token: $token) {
            user {
                _id
                fullName
            }
            token
        }
    }
`