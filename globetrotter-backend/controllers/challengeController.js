const Challenge = require("../models/Challenge")
const User = require("../models/User")
const crypto = require("crypto")

// Generate unique challenge code
const generateChallengeCode = () => {
  return crypto.randomBytes(4).toString("hex")
}

// @desc    Create a new challenge
// @route   POST /api/challenge/create
// @access  Private
exports.createChallenge = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate unique challenge code
    const challengeCode = generateChallengeCode()

    // Create challenge
    const challenge = await Challenge.create({
      inviterId: user._id,
      inviterUsername: user.username,
      inviterScore: user.score,
      challengeCode,
      participants: [
        {
          userId: user._id,
          username: user.username,
          score: user.score,
          correctAnswers: user.correctAnswers,
          incorrectAnswers: user.incorrectAnswers,
        },
      ],
    })

    res.status(201).json({
      success: true,
      challenge: {
        id: challenge._id,
        inviterUsername: challenge.inviterUsername,
        inviterScore: challenge.inviterScore,
        challengeCode: challenge.challengeCode,
        createdAt: challenge.createdAt,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Get challenge by code
// @route   GET /api/challenge/:code
// @access  Public
exports.getChallengeByCode = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ challengeCode: req.params.code })

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" })
    }

    res.status(200).json({
      success: true,
      challenge: {
        id: challenge._id,
        inviterUsername: challenge.inviterUsername,
        inviterScore: challenge.inviterScore,
        challengeCode: challenge.challengeCode,
        participants: challenge.participants,
        createdAt: challenge.createdAt,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Join a challenge
// @route   POST /api/challenge/join/:code
// @access  Private
exports.joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ challengeCode: req.params.code })

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" })
    }

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if user already joined
    const alreadyJoined = challenge.participants.some(
      (participant) => participant.userId.toString() === user._id.toString(),
    )

    if (alreadyJoined) {
      return res.status(400).json({ message: "You have already joined this challenge" })
    }

    // Add user to participants
    challenge.participants.push({
      userId: user._id,
      username: user.username,
      score: user.score,
      correctAnswers: user.correctAnswers,
      incorrectAnswers: user.incorrectAnswers,
      completedAt: new Date(),
    })

    // Update challenge status
    challenge.status = "accepted"
    await challenge.save()

    res.status(200).json({
      success: true,
      message: "Successfully joined the challenge",
      challenge: {
        id: challenge._id,
        inviterUsername: challenge.inviterUsername,
        inviterScore: challenge.inviterScore,
        challengeCode: challenge.challengeCode,
        participants: challenge.participants,
        status: challenge.status,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Update challenge score
// @route   PUT /api/challenge/update/:code
// @access  Private
exports.updateChallengeScore = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ challengeCode: req.params.code })

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" })
    }

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find participant index
    const participantIndex = challenge.participants.findIndex(
      (participant) => participant.userId.toString() === user._id.toString(),
    )

    if (participantIndex === -1) {
      return res.status(400).json({ message: "You are not part of this challenge" })
    }

    // Update participant score
    challenge.participants[participantIndex].score = user.score
    challenge.participants[participantIndex].correctAnswers = user.correctAnswers
    challenge.participants[participantIndex].incorrectAnswers = user.incorrectAnswers
    challenge.participants[participantIndex].completedAt = new Date()

    // Check if all participants have completed
    const allCompleted = challenge.participants.every((participant) => participant.completedAt)

    if (allCompleted) {
      challenge.status = "completed"
    }

    await challenge.save()

    res.status(200).json({
      success: true,
      message: "Challenge score updated",
      challenge: {
        id: challenge._id,
        inviterUsername: challenge.inviterUsername,
        inviterScore: challenge.inviterScore,
        challengeCode: challenge.challengeCode,
        participants: challenge.participants,
        status: challenge.status,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

