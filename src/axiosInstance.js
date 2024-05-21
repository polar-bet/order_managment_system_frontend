import axios from 'axios'
import { authActions } from './store/authSlice'
import { useDispatch, useSelector } from 'react-redux'


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const dispatch = useDispatch()
      const refreshToken = useSelector(state => state.auth.refreshToken)

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { token: refreshToken }
        )
        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken

        dispatch(
          authActions.setToken({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        )

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        store.dispatch(authActions.logout())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
