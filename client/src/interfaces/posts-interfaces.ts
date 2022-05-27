import { IPost } from "../models/IPost";

export interface PostsState {
    posts: IPost[];
    postDetails: IPost;
    errorMessage: string;
    error: boolean;
}