const express = require("express")
const router = express.Router()
const { getRandomDestination, validateAnswer, getUserStats, getLeaderboard } = require("../controllers/gameController")
const { protect } = require("../middleware/auth")

// Get random destination
router.get("/question", getRandomDestination)

// Validate answer
router.post("/answer", protect, validateAnswer)

// Get user stats
router.get("/stats", protect, getUserStats)

// Get leaderboard
router.get("/leaderboard", getLeaderboard)

module.exports = router

