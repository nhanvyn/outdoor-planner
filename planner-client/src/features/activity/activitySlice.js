
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import activityService from './activityService'


const initialState = {
  created_activities: [],
  fetched_activities: [],
  invited_activities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const addActivity = createAsyncThunk('activity/addActivity', async (activity, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await activityService.addActivity(activity, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})




export const getActivities = createAsyncThunk('activity/getActivities', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await activityService.getActivities(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})




export const getActivitiesByInvites = createAsyncThunk('activity/invites', async (invites, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await activityService.getActivitiesByInvites(invites, token)
  } catch (error) {
    console.log("byInvites err:", error)
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteActivity = createAsyncThunk('activity/deleteActivity', async (activity_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await activityService.deleteActivity(activity_id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const updateActivity = createAsyncThunk('activity/updateActivity', async ({activity_id, formData}, thunkAPI) => {
  try {
    console.log("form to be sent: ", formData)
    const token = thunkAPI.getState().auth.user.token
    return await activityService.updateActivity(activity_id, formData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    console.log(error)
    return thunkAPI.rejectWithValue(message)
  }
})


export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    reset: (state) => {
      // console.log("check state activities before reset: ", state.fetched_activities.length, "check state message: ", state.message)
      state.created_activities = initialState.created_activities;
      state.fetched_activities = initialState.fetched_activities;
      state.isError = initialState.isError;
      state.isSuccess = initialState.isSuccess;
      state.isLoading = initialState.isLoading;
      state.message = initialState.message;
      // console.log("check state activities after reset: ", state.fetched_activities.length)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addActivity.pending, (state) => {
      state.isLoading = true
    }).addCase(addActivity.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = "Added " + action.payload.name;
      state.created_activities.push(action.payload)
    }).addCase(getActivities.pending, (state) => {
      state.isLoading = true
    }).addCase(getActivities.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload
      state.fetched_activities = action.payload
    }).addCase(getActivitiesByInvites.pending, (state) => {
      state.isLoading = true
    }).addCase(getActivitiesByInvites.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload
      state.invited_activities = action.payload
    }).addCase(getActivitiesByInvites.rejected, (state, action) => {
      state.isLoading = false
      console.log("getActivitiesByInvites is rejected")
    }).addCase(deleteActivity.pending, (state) => {
      state.isLoading = true
    }).addCase(deleteActivity.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message
      state.fetched_activities = state.fetched_activities.filter((activity) => activity._id !== action.payload.id)
    }).addCase(updateActivity.pending, (state) => {
      state.isLoading = true
    }).addCase(updateActivity.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message
      const index = state.fetched_activities.findIndex(activity => activity._id === action.payload.updated._id)
      if (index !== -1) {
        state.fetched_activities[index] = action.payload.updated
        console.log("returned: ", action.payload.updated)
      }

    }).addCase(updateActivity.rejected, (state, action) => {
      console.log("rejected: ", state.message)
    })
  }
})


export const { reset } = activitySlice.actions
export default activitySlice.reducer 