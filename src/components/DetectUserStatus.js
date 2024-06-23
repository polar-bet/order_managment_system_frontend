import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../store/chatSlice'
import echo from '../echo'

function DetectUserStatus() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const handleHere = users => {
    dispatch(chatActions.setActiveUsers(users))
  }

  const handleJoining = user => {
    dispatch(chatActions.addActiveUser(user))
  }

  const handleLeaving = user => {
    dispatch(chatActions.deleteActiveUser(user))
  }

  useEffect(() => {
    if (user) {
      echo
        .join('active_users')
        .here(handleHere)
        .joining(handleJoining)
        .leaving(handleLeaving)

      return () => {
        echo.leave('active_users')
      }
    }
  }, [user])
}

export default DetectUserStatus
