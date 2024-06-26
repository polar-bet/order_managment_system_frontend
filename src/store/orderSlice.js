import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
    requests: null,
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload
    },
    replaceOrder(state, action) {
      const order = action.payload
      state.orders = state.orders.map(o => {
        o.id === order.id ? order : o
      })
    },
    setRequests(state, action) {
      state.requests = action.payload
    },
  },
})

export const orderActions = orderSlice.actions

export default orderSlice
