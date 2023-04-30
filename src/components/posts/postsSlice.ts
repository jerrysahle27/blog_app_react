// import { api } from "../../app/services/auth/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  category: {
    id:string,
    title: string;
  };
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export interface PostCategoryRequest {
  title: string;
}

const baseUrl = "http://localhost:5000";
type initialState = {
  posts: Post[];
  status: string;
  error: string | null | undefined;
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${baseUrl}/api/posts`);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (values: Post, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
    if (token) {
      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        {
          title: values.title,
          description: values.description,
          category: values.category.id,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      return data;
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: "idle", error: null } as initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});
export default postsSlice.reducer;
export const selectAllPosts = (state: RootState) => state.post.posts;

// export const selectPostById = (state:initialState, postId: Id) =>
//   state.posts.find((post) => post.id === postId)
