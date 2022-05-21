import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../models/IUser'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:8080/' }),
    endpoints: build => ({
        login: build.mutation<IUser, IUser>({ 
            query: user => ({
                url: 'login',
                method: 'POST',
                user
            })
        })
    })
})

export const { useLoginMutation } = authApi