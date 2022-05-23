import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

import { $api } from '../../http'
import { IPost, IComment } from '../../models/IPost'

const token = Cookies.get('user')

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue, dispatch }) => {
        console.log(token);
        
        const { data } = await $api.get('/posts')
        dispatch(setPosts(data))
    }
)

export const getPostDetails = createAsyncThunk(
    'posts/getPostDetails',
    async (id: any, { rejectWithValue, dispatch }) => {
        const { data } = await $api.get(`/posts/${id}`)
        
        dispatch(setPostDetails(data))
    }
)

export const createPostAsync = createAsyncThunk(
    'posts/createPostAsync',
    async (post: IPost, { rejectWithValue, dispatch }) => {
        const { data } = await $api.post('/posts', post)
        
        dispatch(createPost(data))
    }
)
export const createCommentAsync = createAsyncThunk(
    'posts/createCommentAsync',
    async ({ text, id }: IComment, { rejectWithValue, dispatch }) => {
        
        const { data } = await $api.post(`/posts/${id}/comment`, {text})
        
        dispatch(createComment(data))
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
        createComment(state, action: PayloadAction<IComment>) {
            state.postDetails.comments?.push(action.payload)
        },
    }
});

export const { setPosts, setPostDetails, createPost, createComment } = postsSlice.actions;
export default postsSlice.reducer