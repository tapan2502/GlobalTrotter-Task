"use client"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material"
import { EmojiEvents, ContentCopy, Share, AccessTime, CheckCircle, HourglassEmpty } from "@mui/icons-material"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ChallengeCard = ({ challenge, onJoin, onUpdate }) => {
  const navigate = useNavigate()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(challenge.challengeCode)
    toast.info("Challenge code copied to clipboard!")
  }

  const shareChallenge = () => {
    const shareUrl = `${window.location.origin}/challenge/${challenge.challengeCode}`
    navigator.clipboard.writeText(shareUrl)
    toast.info("Challenge link copied to clipboard!")
  }

  const handleJoin = () => {
    if (onJoin) {
      onJoin(challenge.challengeCode)
    } else {
      navigate(`/challenge/${challenge.challengeCode}`)
    }
  }

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(challenge.challengeCode)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning"
      case "accepted":
        return "info"
      case "completed":
        return "success"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <HourglassEmpty fontSize="small" />
      case "accepted":
        return <AccessTime fontSize="small" />
      case "completed":
        return <CheckCircle fontSize="small" />
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="challenge-card">
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmojiEvents color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Challenge</Typography>
            </Box>
            <Chip
              label={challenge.status || "pending"}
              color={getStatusColor(challenge.status || "pending")}
              size="small"
              icon={getStatusIcon(challenge.status || "pending")}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Created by
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {challenge.inviterUsername}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ mr: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Code
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" fontWeight="medium" sx={{ mr: 1 }}>
                  {challenge.challengeCode}
                </Typography>
                <IconButton size="small" onClick={copyToClipboard}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Button size="small" startIcon={<Share fontSize="small" />} onClick={shareChallenge} variant="outlined">
              Share
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Created on {formatDate(challenge.createdAt)}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Participants
          </Typography>

          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            {challenge.participants &&
              challenge.participants.map((participant, index) => (
                <ListItem key={index} sx={{ px: 2, py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>{participant.username.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={participant.username}
                    secondary={`Score: ${participant.score} | Correct: ${participant.correctAnswers}`}
                  />
                  {participant.completedAt && (
                    <Chip label="Completed" size="small" color="success" variant="outlined" />
                  )}
                </ListItem>
              ))}
          </List>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            {challenge.status === "pending" && (
              <Button variant="contained" color="primary" onClick={handleJoin}>
                Join Challenge
              </Button>
            )}
            {challenge.status === "accepted" && (
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Score
              </Button>
            )}
            {challenge.status === "completed" && (
              <Button variant="outlined" color="primary" onClick={() => navigate("/game")}>
                Play New Game
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Helper component for the icon button
const IconButton = ({ children, onClick, size = "medium" }) => {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        p: size === "small" ? 0.5 : 1,
        borderRadius: "50%",
        border: "none",
        bgcolor: "transparent",
        color: "text.secondary",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      {children}
    </Box>
  )
}

export default ChallengeCard

