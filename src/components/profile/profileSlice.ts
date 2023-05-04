import { createSlice } from "@reduxjs/toolkit";
import { ProfileModel } from "./ProfileModel";
type initialState = {
  profile: ProfileModel;
  status: "idle";
  error: null;
};
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    status: "idle",
    error: null,
  } as initialState,

  reducers: {},
  extraReducers(builder){
 
  }
});
export default profileSlice.reducer;
