import axios from 'axios'

const mode = process.env.REACT_APP_API_MODE
let API_URL = 'http://localhost:3500/invite'
if (mode === "production") {
  API_URL = "https://outplanner.onrender.com/invite"
}

const addInvites = async (activity, invites, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("Invites service send invite")
  const response = await axios.post(API_URL + "/", { activity, invites }, config)
  return response.data
}


const getInvites = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + "/", config)
  return response.data
}



const deleteInvitesByActivityID = async (activity_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + "/byActivity/" + activity_id, config)
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

const deleteInvited = async (inviteds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      inviteds
    },
  }
  const response = await axios.delete(API_URL + "/", config)
  return response.data
}


const updateInvites = async (newInvites, act, token) => {
  const params = new URLSearchParams();
  params.append('newInvites', JSON.stringify(newInvites));
  params.append('act', JSON.stringify(act));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  }
  console.log("in inviteService check params:", newInvites, " and ", act)
  const response = await axios.put(API_URL + "/", {}, config)
  return response.data
}




const authService = {
  addInvites,
  deleteInvite,
  updateInvites,
  getInvites,
  deleteInvited,
  deleteInvitesByActivityID
}

export default authService