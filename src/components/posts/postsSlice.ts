// import { api } from "../../app/services/auth/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
export interface Like {
  _id: string;
  user: string;
}
export interface Comment {
  id: string;
  user: string;
  text: string;
  date: Date;
}
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
  likes: Like[];
  comments: Comment[];
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
  "post/likePost",
  async (id: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `${baseUrl}/api/posts/like/` + id,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return data;
    }
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async (values: Comment) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `${baseUrl}/api/posts/comment/` + values.id,
        {
          text: values.text,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
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
    filterByText(state, action) {
      state.filteredPosts =
        action.payload !== ""
          ? [...state.filteredPosts].filter((post) =>
              post.title.toLowerCase().includes(action.payload.toLowerCase())
            )
          : state.filteredPosts;
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
        state.filteredPosts.push(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const existingPost = state.filteredPosts.find(
          ({ _id }) => _id === action.payload._id
        );
        if (existingPost) {
          existingPost.likes = action.payload.likes;
        }
      })

      .addCase(commentPost.fulfilled, (state, action) => {
        const existingPost = state.filteredPosts.find(
          ({ _id }) => _id === action.payload._id
        );
        if (existingPost) {
          existingPost.comments = action.payload.comments;
        }
      });
  },
});
export default postsSlice.reducer;
export const selectAllPosts = (state: RootState) => state.post.filteredPosts;
export const { filterByCategory, filterByText } = postsSlice.actions;
