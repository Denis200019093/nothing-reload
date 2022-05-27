import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie'
import { $api } from '../../http'
import { IUser } from '../../models/IUser';
import ApiError from '../../exceptions/api-error'
import { IProfile } from '../../interfaces/auth-interfaces';

const token = Cookies.get('user')

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async (user: IUser, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await $api.post('/login', user)
            dispatch(login(user))
            
            Cookies.set('user', data.token, { expires: 7 })
            localStorage.setItem('token', data.token)
        } catch (error: any) {
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
            return rejectWithValue(error)
        }
        
    }
)

export const logOut = createAsyncThunk(
    'auth/logOut',
    (_, { dispatch }) => {
        dispatch(setLogOut())
        Cookies.remove('user')
        localStorage.removeItem('token')
    }
)

export const getProfileUser = createAsyncThunk(
    'user/getProfileUser',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await $api.get(`/user/${id}`)        
            dispatch(setProfileUser(data))
        } catch (error) {
            return rejectWithValue(error)
        }
        
    }
)

export const subscribe = createAsyncThunk(
    'user/subscribe',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            await $api.get(`/subscribe/${id}`)
            dispatch(setSubscribe())        
        } catch (error) {
            return rejectWithValue(error)
        }
        
    }
)

export const unsubscribe = createAsyncThunk(
    'user/unsubscribe',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            await $api.get(`/unsubscribe/${id}`)
            dispatch(setUnsubscribe())        
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
  
const initialState = {
    authUser: {} as IUser | any,
    userProfile: {} as IProfile,
    openModal: false as boolean,
    isAuth: false as boolean,
    errorMessage: '' as string
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
        },
        setProfileUser(state, action: PayloadAction<IProfile>) {
            state.userProfile = action.payload
        },
        setSubscribe(state) {
            state.userProfile.currentUserSubscribed = true
        },
        setUnsubscribe(state) {
            state.userProfile.currentUserSubscribed = false
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        }
    }
});

export const { 
    login, 
    registration, 
    setUserInfo, 
    setLogOut, 
    openModal,
    closeModal,
    setProfileUser,
    setSubscribe,
    setUnsubscribe,
    setErrorMessage
} = authSlice.actions;
export default authSlice.reducer