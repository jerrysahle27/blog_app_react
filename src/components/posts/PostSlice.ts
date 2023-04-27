import { api } from "../../app/services/auth/auth";

type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: {
    title: string;
  };
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};
type PostsResponse = Post[];
type PostCategorys = {
  id: string;
  title: string;
};
type PostCategoryListResponse = PostCategorys[];
export interface PostCategoryRequest {
  title: string;
}
export interface PostCategoryResponse {
  title: string;
}

export const PostSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => "/api/posts",
    }),
    getPostCategorys: builder.query<PostCategoryListResponse, void>({
      query: () => "/api/postcategorys",
    }),
    AddPostCategory: builder.mutation<PostCategoryResponse, PostCategoryRequest>({
      query: (postData) => ({
        url: "/api/postcategorys",
        method: "POST",
        body: postData,
      }),
    }),
  }),
});
export const { useGetPostsQuery, useGetPostCategorysQuery,useAddPostCategoryMutation } = PostSlice;
