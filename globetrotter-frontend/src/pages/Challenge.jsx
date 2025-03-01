"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Typography, Box, Button, TextField, Grid, Paper, CircularProgress } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useChallenge } from "../hooks/useChallenge"
import ChallengeCard from "../components/ChallengeCard"
import { toast } from "react-toastify"

const Challenge = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const {
    createNewChallenge,
    getChallenge,
    joinExistingChallenge,
    currentChallenge,
    isLoading,
    error,
    resetChallenge,
  } = useChallenge()
  const [challengeCode, setChallengeCode] = useState(code || "")
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [hasFetchedChallenge, setHasFetchedChallenge] = useState(false)

  const fetchChallenge = useCallback(async () => {
    if (code && !hasFetchedChallenge) {
      setHasFetchedChallenge(true)
      try {
        await getChallenge(code)
      } catch (error) {
        console.error("Error fetching challenge:", error)
        if (error.response && error.response.status === 404) {
          toast.error("Challenge not found")
          navigate("/challenge")
        }
      }
    }
  }, [code, getChallenge, navigate, hasFetchedChallenge])

  useEffect(() => {
    if (code && !currentChallenge && !isLoading) {
      fetchChallenge()
    }
  }, [code, currentChallenge, isLoading, fetchChallenge])

  const handleCreateChallenge = async () => {
    if (isCreating || isLoading) return
    setIsCreating(true)
    resetChallenge() // Reset the challenge state before creating a new one
    console.log("Creating new challenge...") // Add this log
    try {
      console.log("Calling createNewChallenge...") // Add this log
      const challenge = await createNewChallenge()
      console.log("Challenge created:", challenge) // Add this log
      navigate(`/challenge/${challenge.challengeCode}`)
    } catch (error) {
      console.error("Error creating challenge:", error)
      toast.error(error.message || "Failed to create challenge")
    } finally {
      setIsCreating(false)
    }
  }

  const handleJoinChallenge = async () => {
    if (isJoining || isLoading || !challengeCode) return
    setIsJoining(true)
    resetChallenge() // Reset the challenge state before joining a new one
    try {
      await joinExistingChallenge(challengeCode)
      navigate(`/challenge/${challengeCode}`)
    } catch (error) {
      console.error("Error joining challenge:", error)
      toast.error(error.message || "Failed to join challenge")
    } finally {
      setIsJoining(false)
    }
  }

  useEffect(() => {
    return () => {
      resetChallenge()
      setHasFetchedChallenge(false)
    }
  }, [resetChallenge])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="md">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Challenge
        </Typography>

        {currentChallenge ? (
          <ChallengeCard challenge={currentChallenge} />
        ) : (
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Create a New Challenge
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={isCreating ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                  onClick={handleCreateChallenge}
                  disabled={isCreating}
                  fullWidth
                >
                  {isCreating ? "Creating..." : "Create Challenge"}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Join Existing Challenge
                </Typography>
                <Box display="flex" alignItems="center">
                  <TextField
                    variant="outlined"
                    placeholder="Enter challenge code"
                    value={challengeCode}
                    onChange={(e) => setChallengeCode(e.target.value)}
                    fullWidth
                    sx={{ mr: 1 }}
                    disabled={isJoining}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleJoinChallenge}
                    disabled={!challengeCode || isJoining}
                  >
                    {isJoining ? "Joining..." : "Join"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </motion.div>
    </Container>
  )
}

export default Challenge

