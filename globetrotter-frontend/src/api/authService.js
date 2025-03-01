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

// Register user
const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during registration" }
  }
}

// Login user
const login = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during login" }
  }
}

// Logout user
const logout = () => {
  localStorage.removeItem("token")
}

// Get current user
const getMe = async () => {
  try {
    const response = await api.get("/auth/me")
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Failed to get user data" }
  }
}

const authService = {
  register,
  login,
  logout,
  getMe,
}

export default authService

