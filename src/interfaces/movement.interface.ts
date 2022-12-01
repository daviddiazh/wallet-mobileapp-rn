export interface IMovement {
    _id?: string;
    accountId_Income?: string;
    accountId_Outcome?: string;
    reason?: string;
    amount?: number | string;
    fees?: number;
    createdAt?: any;
}