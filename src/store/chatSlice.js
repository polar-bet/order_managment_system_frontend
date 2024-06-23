import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: null,
    messages: null,
    isChatListOpened: true,
    activeUsers: [],
  },
  reducers: {
    openChatList(state) {
      state.isChatListOpened = true
    },
    closeChatList(state) {
      state.isChatListOpened = false
    },
    setActiveUsers(state, action) {
      state.activeUsers = action.payload
    },
    addActiveUser(state, action) {
      state.activeUsers = [...state.activeUsers, action.payload]
    },
    deleteActiveUser(state, action) {
      state.activeUsers = state.activeUsers.filter(
        user => user.id !== action.payload.id
      )
    },
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
        ? state.chats.filter(chat => chat.id !== action.payload)
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
