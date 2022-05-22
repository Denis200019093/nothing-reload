import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../http'
import { IUser } from '../../models/IUser';

export const loginAsync = createAsyncThunk(
    'posts/createPostAsync',
    async (user: IUser, { rejectWithValue, dispatch }) => {
        await $api.post('https:/localhost:8080/login', user)
        dispatch(login(user))
    }
)
  
const initialState = {
    authUser: {} as IUser,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.authUser = action.payload
        }
    }
});

export const { login } = authSlice.actions;
export default authSlice.reducer