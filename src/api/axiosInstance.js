import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: {
    Accept: 'application/json',
  },
})

// const refreshToken = async () => {
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_DOMAIN}/refresh`,
//       null,
//       {
//         headers: {
//           Accept: 'application/json',
//           Authorization: localStorage.getItem('refreshToken'), // Припускаємо, що refresh token зберігається в localStorage
//         },
//       }
//     )
//     const { accessToken } = response.data
//     localStorage.setItem('accessToken', accessToken) // Зберігаємо новий access token
//     return accessToken
//   } catch (error) {
//     console.error('Error refreshing token:', error)
//     throw error
//   }
// }

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       try {
//         const newAccessToken = await refreshToken()
//         axiosInstance.defaults.headers.common['Authorization'] =
//           `Bearer ${newAccessToken}`
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
//         return axiosInstance(originalRequest)
//       } catch (refreshError) {
//         console.error('Error during token refresh:', refreshError)
//         return Promise.reject(refreshError)
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosInstance
