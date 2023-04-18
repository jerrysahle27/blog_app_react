import { api } from "../../app/services/auth/auth";

type Post = {
  id: string;
  text: string;
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
type PostsResponse = Post[];

export const PostSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => "/api/posts",
    }),
  }),
});
export const { useGetPostsQuery } = PostSlice;
