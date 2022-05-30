import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '../../http'
import { IPost, IComment } from '../../models/IPost';

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await $api.get('/posts')
            return data
        } catch (error) {
            return rejectWithValue('Не удалось загрузить посты')
        }  
    }
)

export const createPostAsync = createAsyncThunk(
    'posts/createPostAsync',
    async (post: IPost, { rejectWithValue }) => {
        try {
            const { data } = await $api.post('/posts', post)
            return data
        } catch (error) {
            return rejectWithValue('Не удалось создать пост')
        }
    }
)

export const getPostDetails = createAsyncThunk(
    'posts/getPostDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await $api.get(`/posts/${id}`)
            return data
        } catch (error) {
            return rejectWithValue('Не удалось получить данные поста')
        }        
    }
)


export const createCommentAsync = createAsyncThunk(
    'posts/createCommentAsync',
    async ({ text, id }: IComment, { rejectWithValue }) => {
        try {
            const { data } = await $api.post(`/posts/${id}/comment`, {text})
            return data
        } catch (error) {
            return rejectWithValue('Не удалось создать комментарий')
        }
    }
)

export const likeAsync = createAsyncThunk(
    'posts/likeAsync',
    async (id: string, { rejectWithValue }) => { 
        try {
            await $api.post(`/posts/${id}/like`, id)
            return id
        } catch (err) {
            return rejectWithValue('Не удалось лайкнуть пост')
        }
        
    }
)

export const dislikeAsync = createAsyncThunk(
    'posts/dislikeAsync',
    async (id: string, { rejectWithValue }) => {
        try {
            await $api.post(`/posts/${id}/dislike`, id)
            return id
        } catch (error) {
            return rejectWithValue('Не удалось дизлайкнуть пост')
        }
        
    }
)

export const searching = createAsyncThunk(
    'posts/searching',
    async (searchValue: string, { rejectWithValue }) => {
        try {
            const { data } = await $api.get(`/results?query=${searchValue}`)
            return data
        } catch (error) {
            return rejectWithValue('Не удалось дизлайкнуть пост')
        }
        
    }
)