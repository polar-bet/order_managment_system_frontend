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
            to={`/control-panel/chats/${chat.id}`}
            id="chat-link"
            activeclassname="active"
            className={styles.list__link}
          >
            <div
              className={`${styles.status}  ${
                chat.interlocutor.is_online
                  ? styles.status_online
                  : styles.status_offline
              }`}
            ></div>
            <span className={styles.link__name}>{chat.interlocutor.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default ChatList
