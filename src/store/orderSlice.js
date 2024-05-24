import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload
    },
  },
})

export const orderActions = orderSlice.actions

export default orderSlice
