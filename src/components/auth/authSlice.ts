import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type AuthState = {
  success: boolean | false;
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { success: false, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { success, token },
      }: PayloadAction<{ success: boolean; token: string }>
    ) => {
      state.success = success;
      state.token = token;
    },
    clearCredentials: (state) => {
      state.success = false;
      state.token = null;
    },
  },
});

export const { setCredentials,clearCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.success;
