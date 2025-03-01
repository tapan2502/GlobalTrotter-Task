const mongoose = require("mongoose")

const ChallengeSchema = new mongoose.Schema({
  inviterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  inviterUsername: {
    type: String,
    required: true,
  },
  inviterScore: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending",
  },
  challengeCode: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
      score: Number,
      correctAnswers: Number,
      incorrectAnswers: Number,
      completedAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800, // Automatically delete after 7 days (in seconds)
  },
})

module.exports = mongoose.model("Challenge", ChallengeSchema)

