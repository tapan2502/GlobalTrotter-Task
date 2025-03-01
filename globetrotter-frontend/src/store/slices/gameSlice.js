import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import gameService from "../../api/gameService"

// Get random question
export const getQuestion = createAsyncThunk("game/getQuestion", async (_, { getState, rejectWithValue }) => {
  const { game } = getState()
  if (game.currentQuestion) {
    return { question: game.currentQuestion }
  }
  try {
    return await gameService.getQuestion()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to get question")
  }
})

// Submit answer
export const submitAnswer = createAsyncThunk(
  "game/submitAnswer",
  async ({ destinationId, answer }, { rejectWithValue }) => {
    try {
      return await gameService.submitAnswer(destinationId, answer)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit answer")
    }
  },
)

// Get user stats
export const getUserStats = createAsyncThunk("game/getUserStats", async (_, { rejectWithValue }) => {
  try {
    return await gameService.getUserStats()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to get user stats")
  }
})

// Get leaderboard
export const getLeaderboard = createAsyncThunk("game/getLeaderboard", async (_, { rejectWithValue }) => {
  try {
    return await gameService.getLeaderboard()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to get leaderboard")
  }
})

const initialState = {
  currentQuestion: null,
  result: null,
  stats: {},
  leaderboard: [],
  isLoading: false,
  error: null,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGameState: (state) => {
      state.result = null
      state.isLoading = false
      state.error = null
    },
    resetResult: (state) => {
      state.result = null
    },
    clearCurrentQuestion: (state) => {
      state.currentQuestion = null
    },
  },
  extraReducers: (builder) => {
    builder
      // getQuestion
      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.question && !state.currentQuestion) {
          state.currentQuestion = action.payload.question
        }
        state.result = null
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to get question")
      })

      // submitAnswer
      .addCase(submitAnswer.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.isLoading = false
        state.result = action.payload.result
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to submit answer")
      })

      // getUserStats
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false
        if (JSON.stringify(state.stats) !== JSON.stringify(action.payload.stats)) {
          state.stats = action.payload.stats
        }
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to get user stats")
      })

      // getLeaderboard
      .addCase(getLeaderboard.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false
        state.leaderboard = action.payload.leaderboard
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to get leaderboard")
      })
  },
})

export const { resetGameState, resetResult, clearCurrentQuestion } = gameSlice.actions

export const selectGame = (state) => state.game
export const selectCurrentQuestion = (state) => state.game.currentQuestion
export const selectResult = (state) => state.game.result
export const selectStats = (state) => state.game.stats
export const selectLeaderboard = (state) => state.game.leaderboard

export default gameSlice.reducer

