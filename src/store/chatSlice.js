import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: null,
  },
  reducers: {
    setChats(state, action) {
      state.chats = action.payload
    },
  },
})

export const chatActions = chatSlice.actions

export default chatSlice
