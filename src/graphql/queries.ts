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
            reason
            amount
            createdAt
        }
    }
`;