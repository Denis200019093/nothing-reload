import { IUser } from "../models/IUser";


export interface AuthResponse {
    token: string;
    user: IUser
}

export interface IProfile {
    username: string;
    currentUserSubscribed: boolean;
    subscribers: number[];
    subscriptions: number[];
}