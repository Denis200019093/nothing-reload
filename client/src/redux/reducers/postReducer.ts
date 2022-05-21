import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

import { IPost } from '../../models/IPost'

interface PostsState {
    posts: IPost[];
}
  
const initialState: PostsState = {
    posts: [],
}

const todoSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        },
        // createPost(state, action: PayloadAction<IPost>) {
        //     state.posts.push(action.payload);
        // },
    }
});

export const { getPosts } = todoSlice.actions;

export default todoSlice.reducer;