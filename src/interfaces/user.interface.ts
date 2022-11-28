
export interface IUser {
    id: string;
    fullName: string; 
    phone: number; 
    email: string; 
    password?: string;
}

export interface LoginResponse {
    user: IUser;
    token: string;
}