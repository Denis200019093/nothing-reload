import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

import { $api } from '../../http'
import { IPost, IComment } from '../../models/IPost'
import { AuthResponse } from './auth';
import ApiError from '../../exceptions/api-error'

const token = localStorage.getItem('token')

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await $api.get('/posts')
            dispatch(setPosts(data))
        } catch (error) {
            rejectWithValue('Не удалось')
        }  
    }
)

export const getPostDetails = createAsyncThunk(
    'posts/getPostDetails',
    async (id: any, { rejectWithValue, dispatch }) => {
        const { data } = await $api.get(`/posts/${id}`)
        console.log(data);
        
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
        try {

            if ( !token ) {
                dispatch(setError(true))
                dispatch(setErrorMessage('Авторизуйтесь'))
                throw ApiError.UnauthorizedError()
            }
    
            const { data } = await $api.post(`/posts/${id}/comment`, {text})
            dispatch(createComment(data))
        } catch (error) {
            return rejectWithValue(error)
        }
       
    }
)

export const likeAsync = createAsyncThunk(
    'posts/likeAsync',
    async (id: string, { rejectWithValue, dispatch }) => { 
        
        try {
            
            if ( !token ) {
                dispatch(setError(true))
                dispatch(setErrorMessage('Авторизуйтесь'))
                throw ApiError.UnauthorizedError()
            }

            await $api.post(`/posts/${id}/like`, id)       
            dispatch(likePost(id))
        } catch (err) {
            rejectWithValue(err)
        }
        
    }
)

export const dislikeAsync = createAsyncThunk(
    'posts/dislikeAsync',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            if ( !token ) {
                dispatch(setError(true))
                dispatch(setErrorMessage('Авторизуйтесь'))
                throw ApiError.UnauthorizedError()
            }
    
            await $api.post(`/posts/${id}/dislike`, id)
            dispatch(dislikePost(id))
        } catch (error) {
            rejectWithValue(error)
        }
        
    }
)

interface PostsState {
    posts: IPost[];
    postDetails: IPost;
    errorMessage: string;
    error: boolean
}
  
const initialState: PostsState = {
    posts: [],
    postDetails: {} as IPost,
    errorMessage: '',
    error: false
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        },
        setError(state, action: PayloadAction<boolean>) {
            state.error = action.payload
        },
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
                const { id, rate } = item
                const { rating, userDisliked, userLiked } = rate 

                if ( id === action.payload ) {
                    
                    if ( userDisliked ) { 
                        return {
                            ...item, 
                            rate: {
                                rating: rating + 2, 
                                userDisliked: false,
                                userLiked: true 
                            }
                        }
                    }

                    if ( userLiked ) { 
                        return {
                            ...item, 
                            rate: {
                                rating: rating - 1, 
                                userLiked: false 
                            }  
                        }
                    }

                    return { 
                        ...item, 
                        rate: {
                            rating: rating + 1, 
                            userLiked: true, 
                            userDisliked: false 
                        } 
                    }
                }

                return item
            })
        },
        dislikePost(state, action: PayloadAction<string>) { 
            state.posts = state.posts.map((item) => {
                const { id, rate } = item
                const { rating, userDisliked, userLiked } = rate

                if ( id === action.payload ) {

                    if ( userLiked ) { 
                        return {
                            ...item, 
                            rate: {
                                rating: rating - 2, 
                                userDisliked: true,
                                userLiked: false 
                            }
                        }
                    }

                    if ( userDisliked ) { 
                        return {
                            ...item, 
                            rate: {
                                rating: rating + 1, 
                                userDisliked: false 
                            }
                            
                        }
                    }

                    return {
                        ...item, 
                        rate: {
                            rating: rating - 1, 
                            userLiked: false,
                            userDisliked: true 
                        }
                    }
                }

                return item
            })
        },
    }
});

export const { 
    setErrorMessage, 
    setError, 
    setPosts, 
    setPostDetails, 
    createPost,
    createComment, 
    likePost, 
    dislikePost 
} = postsSlice.actions;
export default postsSlice.reducer