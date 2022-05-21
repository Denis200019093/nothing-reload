import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

import { IPost } from '../../models/IPost'

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
        increase(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        }
    }
});

export const { increase } = postsSlice.actions;