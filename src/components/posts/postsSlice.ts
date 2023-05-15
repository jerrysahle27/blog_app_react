// import { api } from "../../app/services/auth/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
export interface Post {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: {
    _id: string;
    title: string;
  };
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  likes: [];
}

export interface PostCategoryRequest {
  title: string;
}

export const baseUrl = "http://localhost:5000";
type initialState = {
  posts: Post[];
  filteredPosts: Post[];
  status: string;
  error: string | null | undefined;
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${baseUrl}/api/posts`);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (values: Post) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        {
          title: values.title,
          description: values.description,
          category: values.category._id,
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
export const likePost = createAsyncThunk(
  "post/likePost/:id",
  async (id: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(`${baseUrl}/api/posts/like/` + id, {
        headers: {
          authorization: `${token}`,
        },
      });
      return data;
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    filteredPosts: [],
    status: "idle",
    error: null,
  } as initialState,
  reducers: {
    filterByCategory(state, action) {
      const { id } = action.payload;
      state.filteredPosts =
        id !== ""
          ? state.posts.filter((post) => post.category._id === id)
          : state.posts;
    },
    filterByDate(state, action) {
      const { from, to } = action.payload;
      state.posts = state.posts.filter((post) => from <= post.date >= to);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
        state.filteredPosts = [...state.posts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        // state.posts.filter((post) => post.user.)
      });
  },
});
export default postsSlice.reducer;
export const selectAllPosts = (state: RootState) => state.post.filteredPosts;
export const { filterByCategory, filterByDate } = postsSlice.actions;
