import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileModel } from "./ProfileModel";
import axios from "axios";
import { baseUrl } from "../posts/postsSlice";

type initialState = {
  profile: ProfileModel;
  status: string;
  error: string | null | undefined;
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await axios.get(`${baseUrl}/api/profile`);
    return response.data;
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    status: "idle",
    error: null,
  } as initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default profileSlice.reducer;
