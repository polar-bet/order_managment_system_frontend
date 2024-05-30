import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import ChatList from '../../components/ChatPage/ChatList'
import Chat from '../../components/ChatPage/Chat'
import { chatActions } from '../../store/chatSlice'
import echo from '../../echo'

function ChatLayout() {
  const chats = useSelector(state => state.chat.chats)
  const accessToken = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const fetchChats = async () => {
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
    if (chats) {
      chats.forEach(chat => {
        echo
          .channel(`chat.${chat.id}`)
          .listen('.store_message', e => {
            fetchChats()
          })
          .listen('.delete_message', e => {
            fetchChats()
          })
          .listen('.delete_chat', e => {
            fetchChats()
          })
      })

      return () => {
        chats.forEach(chat => {
          echo.leave(`chat.${chat.id}`)
        })
      }
    }
  }, [chats])

  useEffect(() => {
    if (user) {
      echo.channel(`user.${user.id}`).listen('.store_chat', e => {
        fetchChats()
      })

      return () => {
        echo.leave(`user.${user.id}`)
      }
    }
  }, [])

  useEffect(() => {
    fetchChats()
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

export default ChatLayout
