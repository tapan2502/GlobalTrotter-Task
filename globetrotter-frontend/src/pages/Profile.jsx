"use client"

import { useEffect } from "react"
import { Container, Typography, Box, Paper, Grid, Avatar, Divider, CircularProgress } from "@mui/material"
import { motion } from "framer-motion"
import { useAuth } from "../hooks/useAuth"
import { useGame } from "../hooks/useGame"
import StatsCard from "../components/StatsCard"
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as TrophyIcon,
  SportsEsports as GamepadIcon,
  CheckCircle as CorrectIcon,
  Cancel as IncorrectIcon,
} from "@mui/icons-material"

const Profile = () => {
  const { user } = useAuth()
  const { stats, isLoading, error, fetchUserStats } = useGame()

  useEffect(() => {
    fetchUserStats()
  }, [fetchUserStats])

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
          My Profile
        </Typography>

        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: 40,
                      bgcolor: "primary.main",
                      mb: 2,
                    }}
                  >
                    {user?.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {user?.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <EmailIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    {user?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <CalendarIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Joined: {new Date(user?.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Game Statistics
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <StatsCard title="Total Score" value={stats?.score} icon={<TrophyIcon />} color="#FFC107" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <StatsCard title="Games Played" value={stats?.gamesPlayed} icon={<GamepadIcon />} color="#2196F3" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <StatsCard
                      title="Correct Answers"
                      value={stats?.correctAnswers}
                      icon={<CorrectIcon />}
                      color="#4CAF50"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <StatsCard
                      title="Incorrect Answers"
                      value={stats?.incorrectAnswers}
                      icon={<IncorrectIcon />}
                      color="#F44336"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <StatsCard
                      title="Accuracy"
                      value={`${stats?.accuracy}%`}
                      icon={<PersonIcon />}
                      color="#9C27B0"
                      progress={stats?.accuracy}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </motion.div>
    </Container>
  )
}

export default Profile

