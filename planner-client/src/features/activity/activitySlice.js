
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import activityService from './activityService'


const initialState = {
  activities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const addActivity = createAsyncThunk('activity/addActivity', async (activity, thunkAPI) => {
  try {
    return await activityService.addActivity(activity)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(addActivity.pending, (state) => {
      state.isLoading = true
    })
  }
})


export const { reset } = activitySlice.actions
export default activitySlice.reducer 