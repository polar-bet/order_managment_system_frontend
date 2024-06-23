import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const useEcho = () => {
  const { token } = useSelector(state => state.auth)

  const echoInstance = useMemo(() => {
    return new Echo({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      authEndpoint: `${import.meta.env.VITE_HOST_NAME}/broadcasting/auth`,
      forceTLS: true,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    })
  }, [token])

  useEffect(() => {
    return () => {
      echoInstance.disconnect()
    }
  }, [echoInstance])

  return echoInstance
}

export default useEcho
