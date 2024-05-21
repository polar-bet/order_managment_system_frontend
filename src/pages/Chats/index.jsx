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
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  const getChats = async () => {
    try {
      const response = await axiosInstance.get('/chat', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      dispatch(chatActions.setChats(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getChats()
  }, [accessToken])

  return (
    <div className={styles.container}>
      {chats ? (
        <div className={styles.holder}>
          <ChatList />
          <Routes>
            <Route index element={<Chat />} />
            <Route path="/:id" element={<Chat />} />
          </Routes>
        </div>
      ) : (
        <div className={styles.message}>Тут відображатимуться ваші чати</div>
      )}
    </div>
  )
}

export default Chats
