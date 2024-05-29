import React, { useState } from 'react'
import styles from './index.module.scss'
import { Send } from 'react-bootstrap-icons'
import axiosInstance from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { chatActions } from '../../../store/chatSlice'

function ChatInputPanel({ chatId }) {
  const accessToken = useSelector(state => state.auth.token)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const handleSendButtonClick = async () => {
    try {
      const response = await axiosInstance.post(
        `chat/${chatId}/message`,
        {
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const newMessage = response.data

      dispatch(
        chatActions.addMessage(newMessage)
      )
    
      setMessage('')
    } catch (error) {
      console.log(error)
      toast.error('Помилка під час надсилання повідомлення')
    }
  }

  return (
    <div className={styles.container}>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        type="text"
        className={styles.input}
      />
      <button
        onClick={handleSendButtonClick}
        disabled={message.trim().length === 0}
        className={styles.sendButton}
      >
        <span className={styles.sendButton__text}>Відправити</span>
        <Send className={styles.sendButton__icon} />
      </button>
    </div>
  )
}

export default ChatInputPanel
