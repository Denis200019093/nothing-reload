import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../http/index'
import { IPost } from '../../models/IPost';

export const getPosts = createAsyncThunk(
    'posts',
    async (_, {}) => {
        try {
            const { data } = await $api.get<IPost[]>('/');
            
            if (!data) {
                console.log('Server Error!');
            }
            
            return data;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);