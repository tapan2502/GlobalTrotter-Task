const express = require("express")
const router = express.Router()
const { register, login, getMe, getUserByUsername } = require("../controllers/authController")
const { protect } = require("../middleware/auth")

// Register user
router.post("/register", register)

// Login user
router.post("/login", login)

// Get current user
router.get("/me", protect, getMe)

// Get user by username
router.get("/user/:username", getUserByUsername)

module.exports = router

