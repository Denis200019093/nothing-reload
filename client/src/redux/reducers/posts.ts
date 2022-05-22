import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { IPost } from '../../models/IPost'

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue, dispatch }) => {
        const { data } = await axios.get('https:/localhost:8080')
        dispatch(setPosts(data))
    }
)

export const createPostAsync = createAsyncThunk(
    'posts/createPostAsync',
    async (post: any, { rejectWithValue, dispatch }) => {
        await axios.post('https:/localhost:8080', post)
        dispatch(createPost(post))
    }
)

interface PostsState {
    posts: IPost[];
}
  
const initialState: PostsState = {
    posts: [],
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        },
        createPost(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        },
    }
});

export const { setPosts, createPost } = postsSlice.actions;
export default postsSlice.reducer