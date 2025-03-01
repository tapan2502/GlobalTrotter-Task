"use client"

import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectGame,
  selectCurrentQuestion,
  selectResult,
  selectStats,
  selectLeaderboard,
  getQuestion,
  submitAnswer,
  getUserStats,
  getLeaderboard,
  resetGameState,
  resetResult,
  clearCurrentQuestion,
} from "../store/slices/gameSlice"

export const useGame = () => {
  const dispatch = useDispatch()
  const game = useSelector(selectGame)
  const currentQuestion = useSelector(selectCurrentQuestion)
  const result = useSelector(selectResult)
  const stats = useSelector(selectStats)
  const leaderboard = useSelector(selectLeaderboard)

  const fetchQuestion = useCallback(() => {
    return dispatch(getQuestion()).unwrap()
  }, [dispatch])

  const answerQuestion = useCallback(
    (destinationId, answer) => {
      return dispatch(submitAnswer({ destinationId, answer })).unwrap()
    },
    [dispatch],
  )

  const fetchUserStats = useCallback(() => {
    return dispatch(getUserStats()).unwrap()
  }, [dispatch])

  const fetchLeaderboard = useCallback(() => {
    return dispatch(getLeaderboard()).unwrap()
  }, [dispatch])

  const resetGame = useCallback(() => {
    dispatch(resetGameState())
  }, [dispatch])

  const clearResult = useCallback(() => {
    dispatch(resetResult())
  }, [dispatch])

  const clearQuestion = useCallback(() => {
    dispatch(clearCurrentQuestion())
  }, [dispatch])

  return {
    game,
    currentQuestion,
    result,
    stats,
    leaderboard,
    isLoading: game.isLoading,
    error: game.error,
    fetchQuestion,
    answerQuestion,
    fetchUserStats,
    fetchLeaderboard,
    resetGame,
    clearResult,
    clearQuestion,
  }
}

