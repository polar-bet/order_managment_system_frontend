import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: {
    Accept: 'application/json',
  },
})

export default axiosInstance
