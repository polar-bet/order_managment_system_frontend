import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Chat() {
  const { id } = useParams()

  const chats = useSelector(state => state.chat.chats)

  const chat = chats.find(chat => chat.id == id)

  const navigate = useNavigate()

  useEffect(() => {
    if (!chat) {
      navigate('/control-panel/chats')
    }
    console.log(id)
  }, [id])

  return (
    <div className={styles.container}>
      {chat ? (
        <>
          <div className={styles.upperPanel}>{chat.interlocutor.name}</div>
          <div className={styles.messageContainer}>
            {chat.messages ? (
              <div className={styles.messageContainer__content}>
                <div className={styles.messageContainer__messageHolder}>
                  {chat.messages.map((message, index) => (
                    <div
                      key={index}
                      className={styles.messageContainer__messageWrapper}
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
              </div>
            ) : (
              <div className={styles.hintMessage}>
                Напишіть повідомлення, щоб почати спілкування
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.hintMessage}>Оберіть чат для спілкування</div>
      )}
    </div>
  )
}

export default Chat
