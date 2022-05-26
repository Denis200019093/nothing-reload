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
    authUser: {} as IUser | any,
    openModal: false as boolean,
    isAuth: false as boolean
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.authUser = action.payload
            state.isAuth = true
        },
        registration(state, action: PayloadAction<IUser>) {
            state.authUser = action.payload
            state.isAuth = true
        },
        setUserInfo(state, action: PayloadAction<IUser>) {
            state.authUser = action.payload
            state.isAuth = true
        },
        setLogOut(state) {
            state.authUser = {}
            state.isAuth = false
        },
        openModal(state) {
            state.openModal = true
        },
        closeModal(state) {
            state.openModal = false
        }
    }
});

export const { 
    login, 
    registration, 
    setUserInfo, 
    setLogOut, 
    openModal,
    closeModal 
} = authSlice.actions;
export default authSlice.reducer