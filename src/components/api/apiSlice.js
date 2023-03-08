import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    url: "/",
  }),
  endpoints: (build) => ({
    Login: build.mutation({
      query: (userData) => ({
        url: "/api/users/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});
export const { useLoginMutation } = api;
