import axios from 'axios'


const mode = process.env.MODE
let API_URL = 'http://localhost:3500/users'
if (mode === "production"){
  API_URL = "https://outplanner.onrender.com/users"
  console.log("production url: ", API_URL)
} else {
  console.log("development url", API_URL)
}

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

const getGuests = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + "/", config)
  return response.data
} 


const authService = {
  register,
  login, 
  logout,
  getGuests,
}

export default authService