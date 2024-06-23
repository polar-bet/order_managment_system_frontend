import axiosInstance from '../api/axiosInstance'

const login = async credentials => {
  const response = await axiosInstance.post('/login', credentials)
  return response.data
}

const register = async userData => {
  const response = await axiosInstance.post('/register', userData)
  return response.data
}

export { login, register }
