import axios from 'axios'
import store from '../store'
import { authActions } from '../store/authSlice'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const state = store.getState() // Get the state directly from the store
//       const refreshToken = state.auth.refreshToken

//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}/refresh`,
//           { token: refreshToken }
//         )
//         const newAccessToken = response.data.accessToken
//         const newRefreshToken = response.data.refreshToken

//         store.dispatch(
//           authActions.setToken({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//           })
//         )

//         axiosInstance.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${newAccessToken}`
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

//         return axiosInstance(originalRequest)
//       } catch (refreshError) {
//         store.dispatch(authActions.logout())
//         return Promise.reject(refreshError)
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export default axiosInstance
