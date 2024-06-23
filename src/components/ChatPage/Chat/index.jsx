import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ChatInputPanel from '../ChatInputPanel'
import { ToastContainer, toast } from 'react-toastify'
import axiosInstance from '../../../api/axiosInstance'
import { chatActions } from '../../../store/chatSlice'
import { Delete } from '@mui/icons-material'
import Pusher from 'pusher-js'
import echo from '../../../echo'
import { ArrowLeft } from 'react-bootstrap-icons'

function Chat() {
  const { id } = useParams()

  const { chats, isChatListOpened, activeUsers } = useSelector(state => state.chat)

  const chat = chats.find(chat => chat.id == id)

  const accessToken = useSelector(state => state.auth.token)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(chatActions.closeChatList())
    
    if (!chat) {
      dispatch(chatActions.openChatList())
    }
  }, [chat])

  const handleReturnButton = () => {
    navigate('/control-panel/chats/')
  }

  const handleDeleteChatButtonClick = async () => {
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
    <div
      className={`${styles.container} ${
        !isChatListOpened ? styles.container_opened : styles.container_closed
      }`}
    >
      {chat ? (
        <>
          <div className={styles.upperPanel}>
            <button
              onClick={() => handleReturnButton()}
              className={styles.returnButton}
            >
              <ArrowLeft className={styles.returnButton__icon} />
            </button>
            <div className={styles.upperPanel__interlocutorNameHolder}>
              <span className={styles.upperPanel__interlocutorName}>
                {chat.interlocutor.name}
              </span>
              <div
                className={`${styles.status}  ${
                  activeUsers.some(user => user.id === chat.interlocutor.id)
                    ? styles.status_online
                    : styles.status_offline
                }`}
              ></div>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteChatButtonClick()}
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
