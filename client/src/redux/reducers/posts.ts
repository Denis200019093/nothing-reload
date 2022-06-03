import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { 
    getPosts,
    createPostAsync,
    getPostDetails,
    createCommentAsync,
    likeAsync,
    dislikeAsync,
    searching
} from '../actions/postsAction'

import { IPost, IComment } from '../../models/IPost'

interface IState {
    posts: IPost[]
    postDetails: IPost
    foundItems: IPost[],
    isLoading: boolean
    isCreateModal: boolean,
    isCreateComment: boolean,
    error: string
}

const initialState: IState = {
    posts: [],
    postDetails: {},
    foundItems: [],
    isLoading: false,
    isCreateModal: false,
    isCreateComment: false,
    error: ''
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        toggleCreateModal(state) {
            state.isCreateModal = !state.isCreateModal
        },
    },
    extraReducers: {
        // Get all posts
        [getPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoading = false;
            state.error = ''
            state.posts = [...state.posts, ...action.payload]
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
                        },
                        rateDetails: {
                            rate: {
                                rating: rating + 1, 
                                userLiked: true, 
                                userDisliked: false 
                            },
                        }
                    }
                }

                return item
            })
        },
        [likeAsync.pending.type]: (state) => {},
        [likeAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // Disliked post
        [dislikeAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
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
        [dislikeAsync.pending.type]: (state) => {},
        [dislikeAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // FOund list item
        [searching.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoading = false;
            state.error = ''
            state.foundItems = action.payload;
        },
        [searching.pending.type]: (state) => {
            state.isLoading = true;
        },
        [searching.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export const {  
    toggleCreateModal
} = postsSlice.actions;

export default postsSlice.reducer