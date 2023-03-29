import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

export interface User {
  name: string;
  email: string;
}
export interface UserResponse {
  success: boolean;
  token: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserResponse, LoginRequest>({
      query: (userData) => ({
        url: "/api/users/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    protected: builder.mutation<{ message: String }, void>({
      query: () => "Protected",
    }),
  }),
});
export const { useLoginUserMutation, useProtectedMutation } = api;
