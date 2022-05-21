import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}

export const postsApi = createApi({
    reducerPath: 'todos',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    endpoints: build => ({
        getPosts: build.query<ITodo[], number>({ 
            query: (limit) => `products?limit=${limit}` 
        })
    })
})

export const { useGetPostsQuery } = postsApi