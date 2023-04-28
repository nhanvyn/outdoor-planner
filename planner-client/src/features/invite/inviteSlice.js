
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import inviteService from './inviteService'


const initialState = {
  created_invites: [],
  fetched_invites: [],
  user_invites: [],
  user_inviteds: [],
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

export const deleteInvitesByActivityID = createAsyncThunk('invite/byActivity', async (activity_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await inviteService.deleteInvitesByActivityID(activity_id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    console.log("deleteInvitesByActivityID Error: ", error)
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


export const deleteInvited = createAsyncThunk('invite/deleteInvited', async (inviteds, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await inviteService.deleteInvited(inviteds, token)
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
      state.user_inviteds = initialState.user_inviteds;
      state.user_invites = initialState.user_invites;
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
      state.message = "Successfully get all Invites"
      // state.fetched_invites = action.payload
      console.log("check payload: ", action.payload)
      state.user_invites = action.payload.invites
      state.user_inviteds = action.payload.inviteds
      // console.log("in slice check fetched invites1: ", state.fetched_invites)
    }).addCase(getInvites.rejected, (state, action) => {
      console.log("getInvite rejected: ", action.payload)
    }).addCase(deleteInvitesByActivityID.pending, (state) => {
      state.isLoading = true
    }).addCase(deleteInvitesByActivityID.fulfilled, (state, action) => {
      // console.log("in slice check fetched invites2: ", current(state.fetched_invites))
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload
      // console.log("check  invites array bf filter: ", current(state.fetched_invites).invites)
    }).addCase(deleteInvitesByActivityID.rejected, (state, action) => {
      console.log("deleteInvitesByActivityID rejected: ", action.payload)
    })
      .addCase(deleteInvited.pending, (state) => {
        state.isLoading = true
      }).addCase(deleteInvited.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        // state.fetched_invites = state.fetched_invites.filter((invite) => invite._id !== action.payload.id)

      }).addCase(deleteInvited.rejected, (state, action) => {
        console.log("deleteInvited rejected: ", action.payload)
      })
      .addCase(updateInvite.pending, (state) => {
        // state.isLoading = true
      }).addCase(updateInvite.fulfilled, (state, action) => {
        // state.isLoading = false
        // state.isSuccess = true
        // state.message = action.payload.message
        // const index = state.fetched_invites.findIndex(invite => invite._id === action.payload.updated._id)
        // if (index !== -1) {
        //   state.fetched_invites[index] = action.payload.updated
        //   console.log("returned: ", action.payload.updated)
        // }

      }).addCase(updateInvite.rejected, (state, action) => {
        console.log("rejected: ", state.message)
      })
  }
})


export const { reset } = inviteSlice.actions
export default inviteSlice.reducer 