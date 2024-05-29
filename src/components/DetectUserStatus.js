import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../store/chatSlice'
import echo from '../echo'
import Echo from 'laravel-echo'

function DetectUserStatus() {
  const chats = useSelector(state => state.chat.chats)
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (accessToken) {
      const echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        authEndpoint: `${import.meta.env.VITE_HOST_NAME}/broadcasting/auth`,
        forceTLS: true,
        auth: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      })

      echo.join('user-status').here(users => {
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
        echo.leave('user-status')
      }
    }
  }, [accessToken])
}

export default DetectUserStatus
