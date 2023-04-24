import axios from 'axios'

const mode = process.env.MODE
let API_URL = 'http://localhost:3500/activity'
if (mode == "production") {
  API_URL = "https://outplanner.onrender.com/activity"
}

const addActivity = async (activity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + "/", activity, config)
  return response.data
}

const getActivities = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + "/", config)
  return response.data
}


const deleteActivity = async (activity_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + "/" + activity_id, config)
  return response.data
}

const updateActivity = async (activity_id, formData, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "/" + activity_id, formData, config)
  return response.data
}



const authService = {
  addActivity,
  getActivities,
  deleteActivity,
  updateActivity
}

export default authService