import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ChatInputPanel from '../ChatInputPanel'
import { ToastContainer } from 'react-toastify'
import axiosInstance from '../../../api/axiosInstance'
import { chatActions } from '../../../store/chatSlice'
import { Delete } from '@mui/icons-material'
import Pusher from 'pusher-js'
import echo from '../../../echo'

function Chat() {
  const { id } = useParams()

  const chats = useSelector(state => state.chat.chats)

  const chat = chats.find(chat => chat.id == id)

  const accessToken = useSelector(state => state.auth.token)

  const navigate = useNavigate()

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

  const handleDeleteButtonClick = async () => {
    try {
      await axiosInstance.delete(`/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      dispatch(chatActions.setChats(chats.filter(item => item.id != id)))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteMessageButtonClick = async messageId => {
    try {
      await axiosInstance.delete(`/message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      dispatch(
        chatActions.deleteMessage({
          messageId: messageId,
          chatId: id,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      {chat ? (
        <>
          <div className={styles.upperPanel}>
            <span className={styles.upperPanel__interlocutorName}>
              {chat.interlocutor.name}
            </span>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteButtonClick()}
            >
              <Delete className={styles.deleteButton__icon} />
            </button>
          </div>
          <div className={styles.messageContainer}>
            {chat.messages.length > 0 ? (
              <div className={styles.messageContainer__messageList}>
                {chat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={styles.messageContainer__messageWrapper}
                  >
                    <div className={styles.messageContent}>
                      <div className={styles.messageHolder}>
                        <div
                          className={`${styles.message} ${
                            message.is_owner
                              ? styles.message_user
                              : styles.message_interlocutor
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.is_owner && (
                          <div className={styles.messageDeleteButtonContainer}>
                            <button
                              onClick={() =>
                                handleDeleteMessageButtonClick(message.id)
                              }
                              className={styles.messageDeleteButton}
                            >
                              <Delete
                                className={styles.messageDeleteButton__icon}
                              />
                            </button>
                          </div>
                        )}
                      </div>

                      <span className={styles.date}>{message.created_at}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.hintMessage}>
                Напишіть повідомлення, щоб почати спілкування
              </div>
            )}
          </div>
          <ChatInputPanel chatId={id} />
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
          />
        </>
      ) : (
        <div className={styles.hintMessage}>Оберіть чат для спілкування</div>
      )}
    </div>
  )
}

export default Chat
