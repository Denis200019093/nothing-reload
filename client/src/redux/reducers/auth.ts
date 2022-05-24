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

export const getUserInfoAsync = createAsyncThunk(
    'auth/checkeUserAsync',
    async (_, { rejectWithValue, dispatch }) => {
        const { data } = await $api.get('/userinfo')        
        dispatch(setUserInfo(data))
    }
)

export const logOut = createAsyncThunk(
    'auth/logOut',
    (_, { rejectWithValue, dispatch }) => {
        dispatch(setLogOut())
        Cookies.remove('user')
        localStorage.removeItem('token')
    }
)
  
const initialState = {
    authUser: {} as IUser | any
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
        },
        setUserInfo(state, action: PayloadAction<IUser>) {
            state.authUser = action.payload
        },
        setLogOut(state) {
            state.authUser = {}
        }
    }
});

export const { login, registration, setUserInfo, setLogOut } = authSlice.actions;
export default authSlice.reducer