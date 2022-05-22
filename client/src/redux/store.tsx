import { combineReducers, configureStore } from "@reduxjs/toolkit";

import postsSlice from "./reducers/posts";
import authSlice from './reducers/auth';

const rootReducer = combineReducers({
    posts: postsSlice,
    auth: authSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']