import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import ChatList from '../../components/ChatList'
import Chat from '../../components/Chat'
import { Route, Routes } from 'react-router-dom'
import axiosInstance from '../../axiosInstance'
import { chatActions } from '../../store/chatSlice'

function Chats() {
  const chats = useSelector(state => state.chat.chats)
  
  const dispatch = useDispatch()

  const getChats = async () => {
    try {
      const response = axiosInstance.get('/chat')

      dispatch(chatActions.setChats(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getChats()
  }, [])

  return (
    <div className={styles.container}>
      {chats ? (
        <div className={styles.holder}>
          <ChatList />
          <Routes>
            <Route path="/{chatId}" element={<Chat />} />
          </Routes>
          <Chat />
        </div>
      ) : (
        <div className={styles.message}>Тут відображатимуться ваші чати</div>
      )}
    </div>
  )
}

export default Chats
