import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  password2: string;
}
export interface UserResponse {
  success: boolean;
  user: {};
}
export interface LoginResponse {
  success: boolean;
  token: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
type PostCategorys = {
  id: string;
  title: string;
};
type PostCategoryListResponse = PostCategorys[];
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      console.log(token);
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (userData) => ({
        url: "/api/users/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getPostCategorys: builder.query<PostCategoryListResponse, void>({
      query: () => "/api/postcategorys",
    }),
    registerUser: builder.mutation<UserResponse, UserRequest>({
      query: (userData) => ({
        url: "/api/users/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetPostCategorysQuery,
} = api;
