import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie'
import { $api } from '../../http'
import { IUser } from '../../models/IUser';
import ApiError from '../../exceptions/api-error'

export interface AuthResponse {
    token: string;
    user: IUser
}

const token = Cookies.get('user')

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async (user: IUser, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await $api.post<AuthResponse>('/login', user)        
            dispatch(login(user))
            
            Cookies.set('user', data.token, { expires: 7 })
            localStorage.setItem('token', data.token)
        } catch (error) {
            return rejectWithValue(error)
        }
        
    }
)

export const registrationAsync = createAsyncThunk(
    'auth/registrationAsync',
    async (user: IUser, { rejectWithValue, dispatch }) => {
        try {
            await $api.post('/registration', user)
        dispatch(registration(user))
        } catch (error) {
            return rejectWithValue(error)
        }
        
    }
)

export const getUserInfoAsync = createAsyncThunk(
    'auth/checkeUserAsync',
    async (_, { rejectWithValue, dispatch }) => {
        try {

            if ( !token ) {
                throw ApiError.UnauthorizedError()
            }

            const { data } = await $api.get('/userinfo')        
            dispatch(setUserInfo(data))
        } catch (error) {
            rejectWithValue(error)
        }
        
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