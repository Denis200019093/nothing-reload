import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../http'
import { IPost, IComment } from '../../models/IPost'
import ApiError from '../../exceptions/api-error'
import { PostsState } from '../../interfaces/posts-interfaces';
import { AxiosResponse } from 'axios';

const token = localStorage.getItem('token')

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
            if ( !token ) {
                throw ApiError.UnauthorizedError()
            }
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
            if ( !token ) {
                throw ApiError.UnauthorizedError()
            }
            const { data } = await $api.post(`/posts/${id}/like`, id)
            console.log(data);
                   
            return data
        } catch (err) {
            return rejectWithValue('Не удалось лайкнуть пост')
        }
        
    }
)

export const dislikeAsync = createAsyncThunk(
    'posts/dislikeAsync',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            if ( !token ) {
                throw ApiError.UnauthorizedError()
            }
            await $api.post(`/posts/${id}/dislike`, id)
        } catch (error) {
            return rejectWithValue('Не удалось дизлайкнуть пост')
        }
        
    }
)
  
const initialState = {
    posts: [] as IPost[],
    postDetails: {} as IPost,
    isLoading: false as boolean,
    errorMessage: '' as string,
    error: '' as string
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // Get all posts
        [getPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoading = false;
            state.error = ''
            state.posts = action.payload;
        },
        [getPosts.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getPosts.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        // Create post
        [createPostAsync.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
            state.isLoading = false;
            state.error = '';
            state.posts.push(action.payload);
        },
        [createPostAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createPostAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Get data post details
        [getPostDetails.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
            state.isLoading = false;
            state.error = '';
            state.postDetails = action.payload;
        },
        [getPostDetails.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getPostDetails.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Create comment to post on page PostDetails
        [createCommentAsync.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
            state.isLoading = false;
            state.error = '';
            state.postDetails.comments?.push(action.payload)
        },
        [createCommentAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createCommentAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Liked post
        [likeAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = '';
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
        [likeAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [likeAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Disliked post
        [dislikeAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = '';
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
        [dislikeAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [dislikeAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default postsSlice.reducer