import axios from "axios"
import { setupInterceptors } from "./axiosConfig"

// Create axios instance
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Setup axios interceptors
setupInterceptors(api)

// Get random question
const getQuestion = async () => {
  const response = await api.get("/game/question")
  return response.data
}

// Submit answer
const submitAnswer = async (destinationId, answer) => {
  const response = await api.post("/game/answer", { destinationId, answer })
  return response.data
}

// Get user stats
const getUserStats = async () => {
  const response = await api.get("/game/stats")
  return response.data
}

// Get leaderboard
const getLeaderboard = async () => {
  const response = await api.get("/game/leaderboard")
  return response.data
}

const gameService = {
  getQuestion,
  submitAnswer,
  getUserStats,
  getLeaderboard,
}

export default gameService

