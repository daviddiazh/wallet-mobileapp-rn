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
`;

export const LOGIN_MUTATION = gql`
    # mutation Login($login: LoginDtoGQL!) {
    #     login(login: $login) {
    #         user {
    #             id
    #             fullName
    #         }
    #         token
    #     }
    # }

    mutation Mutation($login: LoginDtoGQL!) {
        login(login: $login) {
            ... on SignUpOrLogin {
                user {
                    id
                    fullName
                }
                token
            }
            ... on StatusError {
                code
                description
            }
        }
    }
`;



export const REQUESTCREDIT_MUTATION = gql`
    mutation Mutation($requestCredit: RequestCreditDto!) {
        requestCredit(requestCredit: $requestCredit) {
            movement {
                _id
            }
            updateBalance {
                _id
            }
        }
    }
`;



export const MONEYTRANSFER_MUTATION = gql`
    mutation Mutation($moneyTransfer: MoneyTransferDto!) {
        moneyTransfer(moneyTransfer: $moneyTransfer) {
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
    }
`;