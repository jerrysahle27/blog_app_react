import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const baseUrl = "http://localhost:5000";


const authAdapter = createEntityAdapter({});
const initialState = authAdapter.getInitialState({
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for
})
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const response = await axios.post(`${baseUrl}/api/users/login`, userData);
    return response.data;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    extraReducers(builder) {
      builder
        .addCase(loginUser.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          const { token } = action.payload;
          const decoded = jwt_decode(token);
          localStorage.setItem("jwtToken", token);
          state.userInfo = decoded;
          state.userToken = token;
          state.success = true;
      
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.error.message;
        });
    },
  },
});

export default authSlice.reducer;
