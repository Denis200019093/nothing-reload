import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../models/IPost'
import { IUser } from '../../models/IUser'

export const postsApi = createApi({
    reducerPath: 'posts',
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: build => ({
        login: build.mutation<IUser, IUser>({ 
            query: user => ({
                url: 'login',
                method: 'POST',
                body: user
            }),
        }),

    })
})

export const { useLoginMutation } = postsApi
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { IPost } from '../../models/IPost'

// export const postsApi = createApi({
//     reducerPath: 'posts',
//     tagTypes: ['Post'],
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
//     endpoints: build => ({
//         getPosts: build.query<IPost[], number>({ 
//             query: (limit) => `posts?limit=${limit}`,
//             providesTags: () => ['Post'] 
//         }),
//         createPost: build.mutation<IPost, IPost>({ 
//             query: post => ({
//                 url: 'posts',
//                 method: 'POST',
//                 body: post
//             }),
//             invalidatesTags: ['Post']
//         }),
//         updatePost: build.mutation<IPost, IPost>({ 
//             query: post => ({
//                 url: `posts/${post.id}`,
//                 method: 'PUT',
//                 body: post
//             }),
//             invalidatesTags: ['Post']
//         })
//     })
// })

// export const { 
//     useGetPostsQuery, 
//     useCreatePostMutation, 
//     useUpdatePostMutation 
// } = postsApi