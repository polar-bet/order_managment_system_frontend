import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../store/chatSlice'

function DetectUserStatus() {
  const chats = useSelector(state => state.chat.chats)
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (accessToken) {
      window.Echo.join('user-status', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).here(users => {
        if (chats) {
          users.forEach(user => {
            const chatsWithStatus = chats.map(
              chat =>
                (chat.interlocutor.is_online = chat.interlocutor.id === user.id)
            )
            dispatch(chatActions.setChats(chatsWithStatus))
          })
        }
      })

      return () => {
        window.Echo.leave('user-status')
      }
    }
  }, [accessToken])
}

export default DetectUserStatus
