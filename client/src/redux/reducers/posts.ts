import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
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
    async (id: string, { rejectWithValue, dispatch }) => {
        const { data } = await $api.get(`/posts/${id}`)
        dispatch(setPostDetails(data))
    }
)

export const createPostAsync = createAsyncThunk(
    'posts/createPostAsync',
    async (post: any, { rejectWithValue, dispatch }) => {
        await $api.post('/posts', post)
        dispatch(createPost(post))
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
        createPost(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        },
    }
});

export const { setPosts, setPostDetails, createPost } = postsSlice.actions;
export default postsSlice.reducer