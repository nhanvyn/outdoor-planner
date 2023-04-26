
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import inviteService from './inviteService'


const initialState = {
  created_invites: [],
  fetched_invites: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const addInvites = createAsyncThunk('invite/addInvites', async ({ activity, invites }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await inviteService.addInvites(activity, invites, token)
  } catch (error) {
    console.log("add Invites error:", error)
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})




export const getInvites = createAsyncThunk('invite/getInvites', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await inviteService.getInvites(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteInvite = createAsyncThunk('invite/deleteInvite', async (invite_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await inviteService.deleteInvite(invite_id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const updateInvite = createAsyncThunk('invite/updateInvite', async ({ invite_id, formData }, thunkAPI) => {
  try {
    console.log("form to be sent: ", formData)
    const token = thunkAPI.getState().auth.user.token
    return await inviteService.updateInvite(invite_id, formData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    console.log(error)
    return thunkAPI.rejectWithValue(message)
  }
})


export const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    reset: (state) => {
      // console.log("check state Invites before reset: ", state.fetched_invites.length, "check state message: ", state.message)
      state.created_invites = initialState.created_invites;
      state.fetched_invites = initialState.fetched_invites;
      state.isError = initialState.isError;
      state.isSuccess = initialState.isSuccess;
      state.isLoading = initialState.isLoading;
      state.message = initialState.message;
      // console.log("check state Invites after reset: ", state.fetched_invites.length)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addInvites.pending, (state) => {
      state.isLoading = true
    }).addCase(addInvites.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = "Added " + action.payload.name;
      state.created_invites.push(action.payload)
    }).addCase(addInvites.rejected, (state, action) => {
      console.log("addInvite rejected: ", action.payload)
    }).addCase(getInvites.pending, (state) => {
      state.isLoading = true
    }).addCase(getInvites.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload
      state.fetched_invites = action.payload
    }).addCase(getInvites.rejected, (state, action) => {
      console.log("getInvite rejected: ", action.payload)
    }).addCase(deleteInvite.pending, (state) => {
      state.isLoading = true
    }).addCase(deleteInvite.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message
      state.fetched_invites = state.fetched_invites.filter((invite) => invite._id !== action.payload.id)
    }).addCase(updateInvite.pending, (state) => {
      state.isLoading = true
    }).addCase(updateInvite.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message
      const index = state.fetched_invites.findIndex(invite => invite._id === action.payload.updated._id)
      if (index !== -1) {
        state.fetched_invites[index] = action.payload.updated
        console.log("returned: ", action.payload.updated)
      }

    }).addCase(updateInvite.rejected, (state, action) => {
      console.log("rejected: ", state.message)
    })
  }
})


export const { reset } = inviteSlice.actions
export default inviteSlice.reducer 