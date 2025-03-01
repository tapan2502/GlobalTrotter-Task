import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import authService from "../../api/authService"

// Register user
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData)
    return response
  } catch (error) {
    return rejectWithValue(error.message || "Registration failed")
  }
})

// Login user
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.login(userData)
    return response
  } catch (error) {
    return rejectWithValue(error.message || "Login failed")
  }
})

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logout()
})

// Get current user
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getMe()
    return response
  } catch (error) {
    return rejectWithValue(error.message || "Failed to get user data")
  }
})

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isInitialized: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
        localStorage.setItem("token", action.payload.token)
        state.isInitialized = true
        toast.success("Registration successful!")
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Registration failed")
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
        localStorage.setItem("token", action.payload.token)
        state.isInitialized = true
        toast.success("Login successful!")
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Login failed")
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isInitialized = false
        localStorage.removeItem("token")
        toast.info("Logged out successfully")
      })

      // getCurrentUser
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.error = null
        state.isInitialized = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isInitialized = true
        localStorage.removeItem("token")
      })
  },
})

export const { resetAuthState } = authSlice.actions

export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => Boolean(state.auth.token)

export default authSlice.reducer

