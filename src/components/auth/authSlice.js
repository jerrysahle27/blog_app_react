import { createSlice} from "@reduxjs/toolkit"
const initialState = {
    isAuthenticated: false,
    user: {},
  };
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {

    }
});

export default authSlice.reducer