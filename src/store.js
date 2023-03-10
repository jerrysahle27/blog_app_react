import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./components/auth/authSlice";
import { apiSlice } from "./components/api/apiSlice";
export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
