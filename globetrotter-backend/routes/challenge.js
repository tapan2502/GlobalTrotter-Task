const express = require("express")
const router = express.Router()
const {
  createChallenge,
  getChallengeByCode,
  joinChallenge,
  updateChallengeScore,
} = require("../controllers/challengeController")
const { protect } = require("../middleware/auth")

// Create challenge
router.post("/create", protect, createChallenge)

// Get challenge by code
router.get("/:code", getChallengeByCode)

// Join challenge
router.post("/join/:code", protect, joinChallenge)

// Update challenge score
router.put("/update/:code", protect, updateChallengeScore)

module.exports = router

