import axios from 'axios'

const API_URL = 'http://localhost:3500/activity'

const addActivity  = async (activity) => {
  const response = await axios.post(API_URL + "/addActivity", activity)
  return response.data
}




const authService = {
  addActivity
}

export default authService