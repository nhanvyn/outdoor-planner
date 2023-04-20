import axios from 'axios'

const API_URL = 'http://localhost:3500/users'

const register = async (userData) => {
  console.log("user data is: " + JSON.stringify(userData))
  const response = await axios.post(API_URL + "/register", userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  console.log("response data: ", response.data)
  return response.data
}

const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login, 
  logout
}

export default authService