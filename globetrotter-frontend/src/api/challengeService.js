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

// Create challenge
const createChallenge = async () => {
  console.log("challengeService.createChallenge called") // Add this log
  try {
    const response = await api.post("/challenge/create")
    console.log("API response:", response.data) // Add this log
    return response.data
  } catch (error) {
    console.error("Error in challengeService.createChallenge:", error) // Add this log
    throw error
  }
}

// Get challenge by code
const getChallengeByCode = async (code) => {
  try {
    const response = await api.get(`/challenge/${code}`)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw { response: { status: 404, data: { message: "Challenge not found" } } }
    }
    throw error
  }
}

// Join challenge
const joinChallenge = async (code) => {
  const response = await api.post(`/challenge/join/${code}`)
  return response.data
}

// Update challenge score
const updateChallengeScore = async (code) => {
  const response = await api.put(`/challenge/update/${code}`)
  return response.data
}

const challengeService = {
  createChallenge,
  getChallengeByCode,
  joinChallenge,
  updateChallengeScore,
}

export default challengeService

