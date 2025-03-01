const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        score: user.score,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers,
        gamesPlayed: user.gamesPlayed,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate token
    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        score: user.score,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers,
        gamesPlayed: user.gamesPlayed,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        score: user.score,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers,
        gamesPlayed: user.gamesPlayed,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Get user by username (for challenges)
// @route   GET /api/auth/user/:username
// @access  Public
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        score: user.score,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers,
        gamesPlayed: user.gamesPlayed,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

