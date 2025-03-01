"use client"

import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectChallenge,
  selectCurrentChallenge,
  createChallenge,
  getChallengeByCode,
  joinChallenge,
  updateChallengeScore,
  resetChallengeState,
} from "../store/slices/challengeSlice"

export const useChallenge = () => {
  const dispatch = useDispatch()
  const challenge = useSelector(selectChallenge)
  const currentChallenge = useSelector(selectCurrentChallenge)

  const createNewChallenge = useCallback(async () => {
    console.log("createNewChallenge called")
    // Reset operation state before starting a new operation
    // dispatch(resetOperationState())
    try {
      console.log("Dispatching createChallenge action")
      const result = await dispatch(createChallenge()).unwrap()
      console.log("createChallenge result:", result)
      return result.challenge
    } catch (error) {
      console.error("Error in createNewChallenge:", error)
      // Reset operation state on error
      // dispatch(resetOperationState())
      throw new Error(error || "Failed to create challenge")
    }
  }, [dispatch])

  const getChallenge = useCallback(
    async (code) => {
      try {
        const result = await dispatch(getChallengeByCode(code)).unwrap()
        return result
      } catch (error) {
        if (error.status === 404) {
          throw new Error("Challenge not found")
        }
        throw new Error(error || "Failed to get challenge")
      }
    },
    [dispatch],
  )

  const joinExistingChallenge = useCallback(
    async (code) => {
      try {
        const result = await dispatch(joinChallenge(code)).unwrap()
        return result.challenge
      } catch (error) {
        throw new Error(error || "Failed to join challenge")
      }
    },
    [dispatch],
  )

  const updateScore = useCallback(
    async (code) => {
      try {
        const result = await dispatch(updateChallengeScore(code)).unwrap()
        return result.challenge
      } catch (error) {
        throw new Error(error || "Failed to update challenge score")
      }
    },
    [dispatch],
  )

  const resetChallenge = useCallback(() => {
    dispatch(resetChallengeState())
  }, [dispatch])

  // const resetOperation = useCallback(() => {
  //   dispatch(resetOperationState());
  // }, [dispatch]);

  return {
    challenge,
    currentChallenge,
    isLoading: challenge.isLoading,
    error: challenge.error,
    createNewChallenge,
    getChallenge,
    joinExistingChallenge,
    updateScore,
    resetChallenge,
    // Remove this line: resetOperation,
  }
}

