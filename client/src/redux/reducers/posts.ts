import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '../../http'
import { IPost } from '../../models/IPost'

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue, dispatch }) => {
        const { data } = await $api.get('/posts')
        dispatch(setPosts(data))
    }
)

export const getPostDetails = createAsyncThunk(
    'posts/getPostDetails',
    async (id: any, { rejectWithValue, dispatch }) => {
        const res = await $api.get(`/posts/${id}`)
        console.log(res);
        
        // dispatch(setPostDetails(res))
    }
)

export const createPostAsync = createAsyncThunk(
    'posts/createPostAsync',
    async (post: IPost, { rejectWithValue, dispatch }) => {
        const { data } = await $api.post('/posts', post)
        
        dispatch(createPost(data))
    }
)

interface PostsState {
    posts: IPost[];
    postDetails: IPost;
}
  
const initialState: PostsState = {
    posts: [],
    postDetails: {} as IPost
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        },
        setPostDetails(state, action: PayloadAction<IPost>) {
            state.postDetails = action.payload
        },
        createPost(state, action: PayloadAction<IPost>) {
            state.posts.push(action.payload)
        },
    }
});

export const { setPosts, setPostDetails, createPost } = postsSlice.actions;
export default postsSlice.reducer