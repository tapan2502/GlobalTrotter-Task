import { useSelector, useDispatch } from "react-redux"
import {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../store/slices/authSlice"

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const login = async (credentials) => {
    try {
      await dispatch(loginUser(credentials)).unwrap()
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      await dispatch(registerUser(userData)).unwrap()
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    dispatch(logoutUser())
  }

  const getMe = async () => {
    try {
      await dispatch(getCurrentUser()).unwrap()
    } catch (error) {
      throw error
    }
  }

  return {
    auth,
    user,
    isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    register,
    logout,
    getMe,
  }
}

