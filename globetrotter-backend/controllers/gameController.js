const Destination = require("../models/Destination")
const User = require("../models/User")

// @desc    Get random destination with clues
// @route   GET /api/game/question
// @access  Public
exports.getRandomDestination = async (req, res) => {
  try {
    console.log("Fetching random destination")
    const count = await Destination.countDocuments()
    console.log(`Total destinations in database: ${count}`)

    if (count === 0) {
      console.log("No destinations found in the database")
      return res.status(404).json({ message: "No destinations found" })
    }

    // Generate random index
    const random = Math.floor(Math.random() * count)
    console.log(`Random index: ${random}`)

    // Get random destination - ensure we're getting from all destinations
    const destinations = await Destination.find()
    const destination = destinations[random]

    if (!destination) {
      console.log("No destination found at random index")
      return res.status(404).json({ message: "No destinations found" })
    }

    console.log("Found destination:", destination.name)

    // Get 3 random destinations for multiple choice (excluding the correct one)
    const otherDestinations = await Destination.aggregate([
      { $match: { _id: { $ne: destination._id } } },
      { $sample: { size: 3 } },
      { $project: { name: 1 } },
    ])

    // Create options array with correct answer and 3 random options
    const options = [{ name: destination.name }, ...otherDestinations]

    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5)

    // Get 1-2 random clues from the destination
    const numClues = Math.floor(Math.random() * 2) + 1 // 1 or 2 clues
    const randomClues = destination.clues.sort(() => Math.random() - 0.5).slice(0, numClues)

    res.status(200).json({
      success: true,
      question: {
        id: destination._id,
        clues: randomClues,
        options: shuffledOptions.map((opt) => opt.name),
      },
    })
  } catch (error) {
    console.error("Error in getRandomDestination:", error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Validate answer
// @route   POST /api/game/answer
// @access  Private
exports.validateAnswer = async (req, res) => {
  try {
    const { destinationId, answer } = req.body
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find the destination
    const destination = await Destination.findById(destinationId)

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" })
    }

    // Check if answer is correct
    const isCorrect = destination.name === answer

    // Update user stats
    user.gamesPlayed += 1

    if (isCorrect) {
      user.score += 10 // Award 10 points for correct answer
      user.correctAnswers += 1
    } else {
      user.incorrectAnswers += 1
    }

    await user.save()

    // Get a random fun fact
    const randomFunFactIndex = Math.floor(Math.random() * destination.funFacts.length)
    const funFact = destination.funFacts[randomFunFactIndex]

    res.status(200).json({
      success: true,
      result: {
        isCorrect,
        correctAnswer: destination.name,
        funFact,
        score: user.score,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Get user stats
// @route   GET /api/game/stats
// @access  Private
exports.getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Calculate accuracy
    const totalGames = user.correctAnswers + user.incorrectAnswers
    const accuracy = totalGames > 0 ? Math.round((user.correctAnswers / totalGames) * 100) : 0

    res.status(200).json({
      success: true,
      stats: {
        score: user.score,
        gamesPlayed: user.gamesPlayed,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers,
        accuracy,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Get leaderboard
// @route   GET /api/game/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .select("username score correctAnswers incorrectAnswers gamesPlayed")
      .sort({ score: -1 })
      .limit(10)

    res.status(200).json({
      success: true,
      leaderboard,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

