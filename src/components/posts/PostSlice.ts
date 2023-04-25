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
type PostCategoryResponse = PostCategorys[];


export const PostSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => "/api/posts",
    }),
    getPostCategorys: builder.query<PostCategoryResponse, void>({
      query: () => "/api/postcategorys",
    }),
  }),
});
export const { useGetPostsQuery, useGetPostCategorysQuery } = PostSlice;
