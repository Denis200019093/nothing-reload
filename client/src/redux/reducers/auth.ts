import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie'
import { $api } from '../../http'
import { IUser } from '../../models/IUser';

export interface AuthResponse {
    token: string;
    user: IUser
}
export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async (user: IUser, { rejectWithValue, dispatch }) => {
        const { data } = await $api.post<AuthResponse>('/login', user)
        dispatch(login(user))
        console.log(data.token);
        
        Cookies.set('user', data.token, { expires: 7 })
        localStorage.setItem('token', data.token)

    }
)

export const registrationAsync = createAsyncThunk(
    'auth/registrationAsync',
    async (user: IUser, { rejectWithValue, dispatch }) => {
        await $api.post('/registration', user)
        dispatch(registration(user))
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
        },
        registration(state, action: PayloadAction<IUser>) {
            state.authUser = action.payload
        }
    }
});

export const { login, registration } = authSlice.actions;
export default authSlice.reducer