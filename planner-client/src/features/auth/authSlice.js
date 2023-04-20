import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// register user
export const register = createAsyncThunk('aut/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {

    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// login user
export const login = createAsyncThunk('aut/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {

    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const logout = createAsyncThunk('aut/logout', async () => {
  return await authService.logout()
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // not async here
    reset: (state) => {
      console.log("reducers reset called")
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      console.log("reducers register pending")
      state.isLoading = true
    })
      .addCase(register.fulfilled, (state, action) => {
        console.log("reducers register fullfilled")
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        console.log("reducers register rejected")
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        console.log("login pending")
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login fullfilled")
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        console.log("login rejected")
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.message = action.payload
        state.user = null
      })
  }
})


export const { reset } = authSlice.actions
export default authSlice.reducer 