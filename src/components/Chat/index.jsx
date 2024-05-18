import React from 'react'
import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Chat() {
  const { chatId } = useParams()

  const chats = useSelector(state => state.chat.chats)

  const chat = chats.filter(chat => chat.id === chatId)

  return (
    <div className={styles.container}>
      <div className={styles.upperPanel}>{chat.name}</div>
      <div className={styles.messageContainer}>
        {chat.messages ? (
          <div className={styles.messageContainer__content}>
            {chat.messages.map((message, index) => (
              <div
                key={index}
                className={styles.messageContainer__messageHolder}
              >
                <div
                  className={`${styles.message} ${
                    message.is_owner
                      ? styles.message_user
                      : styles.message_interlocutor
                  }`}
                >
                  {message.content}
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
    </div>
  )
}

export default Chat
