interface IComment {
    id: string;
    value: string;
    username: string
}

export interface IPost {
    id?: string;
    title: string;
    content: string;
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