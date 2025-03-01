"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Box, CircularProgress } from "@mui/material"

import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Challenge from "./pages/Challenge"
import Leaderboard from "./pages/Leaderboard"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import { getCurrentUser } from "./store/slices/authSlice"
import { selectAuth } from "./store/slices/authSlice"

const App = () => {
  const dispatch = useDispatch()
  const { token, isLoading, isInitialized } = useSelector(selectAuth)

  useEffect(() => {
    if (token && !isInitialized) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, token, isInitialized])

  if (!isInitialized && token) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge/:code?"
          element={
            <ProtectedRoute>
              <Challenge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

