import axios from 'axios'

const mode = process.env.MODE
let API_URL = 'http://localhost:3500/invite'
if (mode === "production") {
  API_URL = "https://outplanner.onrender.com/invite"
}

const addInvite = async (invite, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + "/", invite, config)
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


const deleteInvite = async (invite_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + "/" + invite_id, config)
  return response.data
}

const updateInvite = async (invite_id, formData, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "/" + invite_id, formData, config)
  return response.data
}



const authService = {
  addInvite,
  getActivities,
  deleteInvite,
  updateInvite
}

export default authService