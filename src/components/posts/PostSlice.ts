import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { api } from "../../app/services/auth/auth";
import { RootState } from "../../app/store";
type Post = {
  id: string;
  text: string;
  name: string;
  avatar: string;
  category: {
    title: string;
  };
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};
const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
});
const initialState = postsAdapter.getInitialState();

export const PostSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post, []>({
      query: () => "/posts",
      transformResponse: (responseData: []) => {
        return postsAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});
export const { useGetPostsQuery } = PostSlice;
export const selectPostsResult = PostSlice.endpoints.getPosts.select();

export const selectAllPostsResult = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);
export const { selectAll: selectAllPosts, selectById: selectPostById } =
  postsAdapter.getSelectors(
    (state: RootState) => selectAllPostsResult(state) ?? initialState
  );
