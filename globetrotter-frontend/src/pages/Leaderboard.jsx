"use client"

import { useEffect } from "react"
import { Container, Typography, Box, CircularProgress } from "@mui/material"
import { motion } from "framer-motion"
import { useGame } from "../hooks/useGame"
import LeaderboardTable from "../components/LeaderboardTable"

const Leaderboard = () => {
  const { leaderboard, fetchLeaderboard, isLoading, error } = useGame()

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Global Leaderboard
        </Typography>

        {error ? <Typography color="error">{error}</Typography> : <LeaderboardTable leaderboard={leaderboard} />}
      </motion.div>
    </Container>
  )
}

export default Leaderboard

