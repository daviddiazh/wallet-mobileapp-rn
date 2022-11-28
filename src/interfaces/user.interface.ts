
export interface IUser {
    id: string;
    fullName: string; 
    phone: number | string; 
    email: string; 
    password?: string;
}

export interface LoginResponse {
    user: IUser;
    token: string;
}