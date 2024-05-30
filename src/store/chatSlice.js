import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: null,
    messages: null,
  },
  reducers: {
    setChats(state, action) {
      state.chats = action.payload
    },
    addChat(state, action) {
      state.chats = state.chats
        ? [...state.chats, action.payload]
        : action.payload
    },
    deleteChat(state, action) {
      state.chats = state.chats
        ? state.chats.filter(c => c.id !== action.payload.id)
        : []
    },
    addMessage(state, action) {
      const message = action.payload
      const chatId = message.chat_id

      const chat = state.chats.find(chat => chat.id === chatId)

      if (chat) {
        chat.messages = chat.messages ? [...chat.messages, message] : [message]
      }
    },
    deleteMessage(state, action) {
      const { messageId, chatId } = action.payload

      const chat = state.chats.find(chat => chat.id == chatId)

      chat.messages = chat.messages
        ? chat.messages.filter(m => m.id !== messageId)
        : []
    },
  },
})

export const chatActions = chatSlice.actions

export default chatSlice
