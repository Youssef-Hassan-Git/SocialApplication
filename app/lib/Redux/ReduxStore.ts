import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice"
import postsSlice from "./PostsSlice";
import createPostSlice from "./CreatePostSlice";
import profileSlice from "./ProfileSlice";
export const store = configureStore({
    reducer:{
        authSlice,
        postsSlice,
        createPostSlice,
        profileSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;