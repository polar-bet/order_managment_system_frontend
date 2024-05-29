// import Echo from 'laravel-echo'
// import Pusher from 'pusher-js'
// import { useSelector } from 'react-redux'

// window.Pusher = Pusher

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//   host: import.meta.env.VITE_HOST_NAME,
//   authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   auth: {
//     headers: {
//       Accept: 'application/json',
//     },
//   },
// })

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   forceTLS: true,
// })

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  authEndpoint: `${import.meta.env.VITE_HOST_NAME}/broadcasting/auth`,
  forceTLS: true,
})

export default echo
