import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'
import './index.scss'
import React from 'react'
import { useSelector } from 'react-redux'

function ChatList() {
  const chats = useSelector(state => state.chat.chats)
  return (
    <ul className={styles.list}>
      {chats.map((chat, index) => (
        <li key={index} className={styles.list__item}>
          <NavLink
            id="chat-link"
            activeclassname="active"
            className={styles.list__link}
          >
            {chat.name}
            <div
              className={`${styles.status} ${styles.status_online} ${styles.status_offline}`}
            ></div>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default ChatList
