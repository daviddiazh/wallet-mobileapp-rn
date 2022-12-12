
export interface IUser {
    _id?: string;
    fullName?: string; 
    phone?: number | string; 
    email?: string; 
    password?: string;
    profilePicture?: string;
}

export interface LoginResponse {
    user: IUser;
    token: string;
}