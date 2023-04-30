import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LoginResponse} from "../../app/services/api"
import type { RootState } from '../../app/store'

type AuthState = {
  success: boolean | false
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { success: false, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { success, token } }: PayloadAction<{ success: boolean; token: string }>
    ) => {
      state.success = success
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.success