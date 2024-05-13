import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'

export const actions = authSlice.actions

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})

export default store
