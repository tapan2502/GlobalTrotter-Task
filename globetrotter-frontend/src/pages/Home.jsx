"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material"
import { SportsEsports, EmojiEvents, People, CheckCircle, Public, TravelExplore, AccessTime } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useAuth } from "../hooks/useAuth"
import { useGame } from "../hooks/useGame"
import StatsCard from "../components/StatsCard"

const Home = () => {
  const { user } = useAuth()
  const { stats, fetchUserStats } = useGame()
  const navigate = useNavigate()
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    fetchUserStats()
    // Simulated recent activity data
    setRecentActivity([
      { type: "game", message: "You played a new game", time: "2 hours ago" },
      { type: "challenge", message: "You completed a challenge", time: "1 day ago" },
      { type: "achievement", message: 'You earned the "Globe Trotter" badge', time: "3 days ago" },
    ])
  }, [fetchUserStats])

  const calculateAccuracy = () => {
    if (!stats) return 0
    return stats.gamesPlayed > 0 ? stats.accuracy : 0
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {user?.username}!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Test your geography knowledge and challenge friends in this exciting quiz game.
          </Typography>
        </motion.div>
      </Box>

      {stats && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Your Stats
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Score"
                value={stats.score}
                icon={<EmojiEvents fontSize="medium" color="primary" />}
                color="#3f51b5"
                subtitle="Points earned"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Games Played"
                value={stats.gamesPlayed}
                icon={<SportsEsports fontSize="medium" color="info" />}
                color="#2196f3"
                subtitle="Total games"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Correct Answers"
                value={stats.correctAnswers}
                icon={<CheckCircle fontSize="medium" color="success" />}
                color="#4caf50"
                subtitle={`${stats.incorrectAnswers} incorrect`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Accuracy"
                value={`${calculateAccuracy()}%`}
                icon={<TravelExplore fontSize="medium" color="warning" />}
                color="#ff9800"
                progress={calculateAccuracy()}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "primary.light",
                        borderRadius: "50%",
                        p: 1,
                        mr: 2,
                        display: "flex",
                      }}
                    >
                      <SportsEsports color="primary" />
                    </Box>
                    <Typography variant="h6" component="div">
                      Play Game
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Test your knowledge with geography questions. Earn points for correct answers.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="large" fullWidth onClick={() => navigate("/game")} sx={{ py: 1 }}>
                    Start Game
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "secondary.light",
                        borderRadius: "50%",
                        p: 1,
                        mr: 2,
                        display: "flex",
                      }}
                    >
                      <People color="secondary" />
                    </Box>
                    <Typography variant="h6" component="div">
                      Challenge Friends
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Create a challenge and invite friends to compete. See who knows geography best!
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="large" fullWidth onClick={() => navigate("/challenge")} sx={{ py: 1 }}>
                    Create Challenge
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "success.light",
                        borderRadius: "50%",
                        p: 1,
                        mr: 2,
                        display: "flex",
                      }}
                    >
                      <EmojiEvents color="success" />
                    </Box>
                    <Typography variant="h6" component="div">
                      Leaderboard
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Check the global rankings and see how you compare to other players worldwide.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="large" fullWidth onClick={() => navigate("/leaderboard")} sx={{ py: 1 }}>
                    View Leaderboard
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Recent Activity
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <List>
            {recentActivity.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    {activity.type === "game" && <SportsEsports color="primary" />}
                    {activity.type === "challenge" && <People color="secondary" />}
                    {activity.type === "achievement" && <EmojiEvents color="success" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.message}
                    secondary={
                      <React.Fragment>
                        <AccessTime fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>

      <Box sx={{ textAlign: "center", py: 4 }}>
        <Public sx={{ fontSize: 60, color: "primary.main", opacity: 0.7, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Explore the World with Globetrotter
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Learn about different countries, landmarks, and cultures while having fun!
        </Typography>
      </Box>

      <Box component="footer" sx={{ mt: 8, py: 3, borderTop: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                About
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Globetrotter is an educational geography quiz game designed to make learning about the world fun and
                engaging.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p">
                <Button color="inherit" onClick={() => navigate("/game")}>
                  Play Game
                </Button>
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p">
                <Button color="inherit" onClick={() => navigate("/challenge")}>
                  Challenges
                </Button>
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p">
                <Button color="inherit" onClick={() => navigate("/leaderboard")}>
                  Leaderboard
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: support@globetrotter.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +1 (555) 123-4567
              </Typography>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © "}
              <span color="inherit">Globetrotter</span> {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}

export default Home

