import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie'
import { $api } from '../../http'
import { IUser } from '../../models/IUser';
import { IProfile } from '../../interfaces/auth-interfaces';
import { AppDispatch } from '../store';

const token = Cookies.get('user')

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async (user: IUser, { rejectWithValue }) => {
        try {
            const { data } = await $api.post('/login', user)
            
            Cookies.set('user', data.token, { expires: 7 })
            localStorage.setItem('token', data.token)

            return user
        } catch (error) {
            return rejectWithValue('Не удалось залогиниться')
        }
        
    }
)

export const registrationAsync = createAsyncThunk(
    'auth/registrationAsync',
    async (user: IUser, { rejectWithValue }) => {
        try {
            await $api.post('/registration', user)
            return user
        } catch (error) {
            return rejectWithValue('Не удалось')
        }
    }
)

export const getUserInfoAsync = createAsyncThunk(
    'auth/getUserInfoAsync',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await $api.get('/userinfo')        
            return data
        } catch (error) {
            return rejectWithValue('Не удалось получить информацию о юзере')
        }
        
    }
)

export const logOut = () => (dispatch: AppDispatch) => {
    dispatch(setLogOut())
    Cookies.remove('user')
    localStorage.removeItem('token')
}

export const getProfileUser = createAsyncThunk(
    'user/getProfileUser',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await $api.get(`/user/${id}`)        
            dispatch(setProfileUser(data))
        } catch (error) {
            return rejectWithValue('Невозможно получить профиль юзера')
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

interface IState {
    authUser: IUser
    userProfile: IProfile
    openModal: boolean
    isAuth: boolean
    isLoading: boolean
    error: string
}
  
const initialState: IState = {
    authUser: {} ,
    userProfile: {},
    openModal: false,
    isAuth: false,
    isLoading: false,
    error: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
    },
    extraReducers: {
        // Login
        [loginAsync.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = ''
            state.isAuth = true
            state.authUser = action.payload
        },
        [loginAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [loginAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        // Registration
        [registrationAsync.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = ''
            state.isAuth = true
            state.authUser = action.payload
        },
        [registrationAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registrationAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        // Get user info
        [getUserInfoAsync.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = ''
            state.isAuth = true
            state.authUser = action.payload
        },
        [getUserInfoAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getUserInfoAsync.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export const {  
    setLogOut, 
    openModal,
    closeModal,
    setProfileUser,
    setSubscribe,
    setUnsubscribe
} = authSlice.actions;
export default authSlice.reducer