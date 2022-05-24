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

export const likeAsync = createAsyncThunk(
    'posts/likeAsync',
    async (id: any, { rejectWithValue, dispatch }) => { 
        const res = await $api.post(`/posts/${id}/like`, id)
        console.log(res);
        
        dispatch(likePost(id))
    }
)

export const dislikeAsync = createAsyncThunk(
    'posts/dislikeAsync',
    async (id: string, { rejectWithValue, dispatch }) => {
        
        await $api.post(`/posts/${id}/dislike`, id)
        
        dispatch(dislikePost(id))
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
        likePost(state, action: PayloadAction<string>) { 
            state.posts = state.posts.map((item) => {
                if ( item.id === action.payload ) {
                    
                    if ( item.userDisliked ) { 
                        return {
                            ...item, 
                            dislikes: item.dislikes - 1, 
                            likes: item.likes + 1, 
                            userDisliked: false,
                            userLiked: true 
                        }
                    }

                    if ( item.userLiked ) { 
                        return {
                            ...item, 
                            likes: item.likes - 1, 
                            userLiked: false 
                        }
                    }

                    return { ...item, likes: item.likes + 1, userLiked: true, userDisliked: false }
                }

                return item
            })
        },
        dislikePost(state, action: PayloadAction<string>) { 
            state.posts = state.posts.map((item) => {
                if ( item.id === action.payload ) {

                    if ( item.userLiked ) { 
                        return {
                            ...item, 
                            dislikes: item.dislikes + 1, 
                            likes: item.likes - 1, 
                            userDisliked: true,
                            userLiked: false 
                        }
                    }

                    if ( item.userDisliked ) { 
                        return {
                            ...item, 
                            dislikes: item.dislikes - 1, 
                            userDisliked: false 
                        }
                    }

                    return {...item, dislikes: item.dislikes + 1, userLiked: false, userDisliked: true }
                }

                return item
            })
        },
    }
});

export const { setPosts, setPostDetails, createPost, createComment, likePost, dislikePost } = postsSlice.actions;
export default postsSlice.reducer