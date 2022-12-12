import { gql } from '@apollo/client'

/** 
 ** Authentication
*/

export const SIGNUP_MUTATION = gql`
    mutation SignUp($signUp: SignUpDto!) {
        signUp(signUp: $signUp) {
            ... on SignUpOrLogin {
                user {
                    _id
                    fullName
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

export const LOGIN_MUTATION = gql`
    mutation Mutation($login: LoginDtoGQL!) {
        login(login: $login) {
            ... on SignUpOrLogin {
                user {
                    _id
                    fullName
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


/** 
 ** Movements
*/

export const REQUESTCREDIT_MUTATION = gql`
    mutation Mutation($requestCredit: RequestCreditDto!) {
        requestCredit(requestCredit: $requestCredit) {
            ... on RequestCredit {
                movement {
                    _id
                }
                updateBalance {
                    _id
                }
            }
            ... on StatusError {
                code
                title
                description
            }
        }
    }
`;

export const MONEYTRANSFER_MUTATION = gql`
    mutation MoneyTransfer($moneyTransfer: MoneyTransferDto!) {
        moneyTransfer(moneyTransfer: $moneyTransfer) {
            ... on MoneyTransfer {
                movement {
                    _id
                }
                savedBalanceIncome {
                    _id
                }
                savedBalanceOutcome {
                    _id
                }
            }
            ... on StatusError {
                code
                title
                description
            }
        }
    }
`;