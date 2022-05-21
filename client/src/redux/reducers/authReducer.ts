import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

import { IUser } from '../../models/IUser'

interface PostsState {
    authUser: IUser;
}
  
const initialState: PostsState = {
    authUser: {} as IUser,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.authUser = action.payload
        },
    }
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
