import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'
import './index.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import echo from '../../../echo'
import { chatActions } from '../../../store/chatSlice'

function ChatList() {
  const { chats, activeUsers, isChatListOpened } = useSelector(
    state => state.chat
  )

  return (
    
      <ul className={`${styles.list} ${isChatListOpened ? styles.list_opened : styles.list_closed}`}>
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
                  activeUsers.some(user => user.id === chat.interlocutor.id)
                    ? styles.status_online
                    : styles.status_offline
                }`}
              ></div>
              <span className={styles.link__name}>
                {chat.interlocutor.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
  )
}

export default ChatList
