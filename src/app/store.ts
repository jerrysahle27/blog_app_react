import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import authReducer from "../components/auth/authSlice";
import postReducer from "../components/posts/postsSlice";
import profileReducer from "../components/profile/profileSlice";
const persistConfig = {
  key: "auth",
  storage,
  stateReconciler: hardSet,
};
const persistedReducer = persistReducer<any, any>(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: persistedReducer,
    post: postReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
