import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: localStorage.getItem('refreshToken'),
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setToken(state, action) {
      state.token = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('refreshToken', state.refreshToken)
    },
    logout(state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('refreshToken')
    },
  },
})

export const authActions = authSlice.actions

export default authSlice
