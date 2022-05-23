export interface IComment {
    id?: string;
    text: string;
}

export interface IPost {
    id?: string;
    title: string;
    content: string;
    comments?: IComment[];
}
// interface IComment {
//     id: string;
//     value: string;
//     username: string
// }

// export interface IPost {
//     id: string;
//     title: string;
//     description: string;
//     likes: 0,
//     comments: IComment[],
// }