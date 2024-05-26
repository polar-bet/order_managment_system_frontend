import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import chatSlice from './chatSlice'
import productSlice from './productSlice'
import orderSlice from './orderSlice'
import userSlice from './userSlice'
import roleSlice from './roleSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    role: roleSlice.reducer,
  },
})

export default store
