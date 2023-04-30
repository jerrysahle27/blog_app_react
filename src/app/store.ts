import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer from "../components/auth/authSlice";
import postReducer from "../components/posts/postsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
