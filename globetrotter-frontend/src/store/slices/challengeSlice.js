import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import challengeService from "../../api/challengeService"

// Create challenge
export const createChallenge = createAsyncThunk("challenge/createChallenge", async (_, { rejectWithValue }) => {
  console.log("createChallenge thunk called")
  try {
    console.log("Calling challengeService.createChallenge")
    const response = await challengeService.createChallenge()
    console.log("Challenge created:", response)
    return response
  } catch (error) {
    console.error("Error in createChallenge thunk:", error)
    return rejectWithValue(error.response?.data?.message || "Failed to create challenge")
  }
})

// Get challenge by code
export const getChallengeByCode = createAsyncThunk(
  "challenge/getChallengeByCode",
  async (code, { rejectWithValue }) => {
    try {
      const response = await challengeService.getChallengeByCode(code)
      return response
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({ message: "Challenge not found", status: 404 })
      }
      return rejectWithValue(error.response?.data?.message || "Failed to get challenge")
    }
  },
)

// Join challenge
export const joinChallenge = createAsyncThunk("challenge/joinChallenge", async (code, { rejectWithValue }) => {
  try {
    return await challengeService.joinChallenge(code)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to join challenge")
  }
})

// Update challenge score
export const updateChallengeScore = createAsyncThunk(
  "challenge/updateChallengeScore",
  async (code, { rejectWithValue }) => {
    try {
      return await challengeService.updateChallengeScore(code)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update challenge score")
    }
  },
)

const initialState = {
  currentChallenge: null,
  isLoading: false,
  error: null,
}

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    resetChallengeState: (state) => {
      state.currentChallenge = null
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // createChallenge
      .addCase(createChallenge.pending, (state) => {
        console.log("createChallenge.pending")
        state.isLoading = true
        state.error = null
      })
      .addCase(createChallenge.fulfilled, (state, action) => {
        console.log("createChallenge.fulfilled", action.payload)
        state.isLoading = false
        state.currentChallenge = action.payload.challenge
        toast.success("Challenge created successfully!")
      })
      .addCase(createChallenge.rejected, (state, action) => {
        console.log("createChallenge.rejected", action.payload)
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to create challenge")
      })

      // getChallengeByCode
      .addCase(getChallengeByCode.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getChallengeByCode.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentChallenge = action.payload.challenge
      })
      .addCase(getChallengeByCode.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        if (action.payload && action.payload.status === 404) {
          toast.error(action.payload.message)
        } else {
          toast.error(action.payload || "Failed to get challenge")
        }
      })

      // joinChallenge
      .addCase(joinChallenge.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(joinChallenge.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentChallenge = action.payload.challenge
        toast.success("Successfully joined the challenge!")
      })
      .addCase(joinChallenge.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to join challenge")
      })

      // updateChallengeScore
      .addCase(updateChallengeScore.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateChallengeScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentChallenge = action.payload.challenge
        toast.success("Challenge score updated!")
      })
      .addCase(updateChallengeScore.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to update challenge score")
      })
  },
})

export const { resetChallengeState } = challengeSlice.actions

export const selectChallenge = (state) => state.challenge
export const selectCurrentChallenge = (state) => state.challenge.currentChallenge

export default challengeSlice.reducer

