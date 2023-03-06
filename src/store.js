import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./app/auth/authSlice";
import api from "./app/api/apiSlice";
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
