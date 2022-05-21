import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './actions/posts.api';
import { authReducer } from './reducers/authReducer';

export const store = configureStore({
    reducer: { 
        [ postsApi.reducerPath ]: postsApi.reducer, 
        auth: authReducer 
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(postsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;