import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../models/IPost'

export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: build => ({
        getPosts: build.query<IPost[], number>({ 
            query: (limit) => `posts?limit=${limit}` 
        }),
        createPost: build.mutation<IPost, IPost>({ 
            query: post => ({
                url: 'posts',
                method: 'POST',
                body: post
            })
        })
    })
})

export const { useGetPostsQuery, useCreatePostMutation } = postsApi