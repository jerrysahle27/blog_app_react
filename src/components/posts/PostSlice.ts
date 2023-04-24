import { type } from "@testing-library/user-event/dist/type";
import { api } from "../../app/services/auth/auth";

type Post = {
  id: string;
  title: string;
  description:string;
  // name: string;
  avatar: string;
  date: string,
  category: {
    title: string;
  };
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};
type PostCategory ={
  id:string;
  title: string
}
type PostsResponse = Post[];
type PostCategoryResponse = PostCategory[];
export const PostSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => "/api/posts",
    }),
    getPostCategorys:builder.query<PostCategoryResponse,void>({
      query: () => "/api/postcategorys",
    })
  }),
});
export const { useGetPostsQuery,useGetPostCategorysQuery } = PostSlice;
