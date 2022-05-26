export interface IComment {
    id?: string;
    text: string;
}

interface IRate {
    rating?: number;
    userDisliked?: boolean;
    userLiked?: boolean;
}

export interface IPost {
    id?: string;
    title: string;
    content: string;
    comments?: IComment[];
    rate?: IRate
    
}