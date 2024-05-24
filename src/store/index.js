import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import chatSlice from './chatSlice'
import productSlice from './productSlice'
import orderSlice from './orderSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
  },
})

export default store
