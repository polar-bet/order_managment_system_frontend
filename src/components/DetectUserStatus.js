import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../store/chatSlice'

function DetectUserStatus() {
  const chats = useSelector(state => state.chat.chats)
  const dispatch = useDispatch()

  useEffect(() => {
    window.Echo.join('user-status').here(users => {
      if (chats) {
        users.forEach(user => {
          const chatsWithStatus = chats.map(
            chat => (chat.status = chat.interlocutor === user.id)
          )
          dispatch(chatActions.setChats(chatsWithStatus))
        })
      }
    })

    return () => {
      window.Echo.leave('user-status')
    }
  }, [])
}

export default DetectUserStatus
