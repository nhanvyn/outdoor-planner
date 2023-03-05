import axios from 'axios'

const API_URL = '/users'

const register = async (userData) => {
  console.log("user data is: " + JSON.stringify(userData))
  const response = await axios.post(API_URL + "/register", userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  register,
}

export default authService