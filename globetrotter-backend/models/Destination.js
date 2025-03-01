const mongoose = require("mongoose")

const DestinationSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  clues: {
    type: [String],
    required: true,
    validate: [arrayMinLength, "At least one clue is required"],
  },
  funFacts: {
    type: [String],
    required: true,
    validate: [arrayMinLength, "At least one fun fact is required"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
  continent: {
    type: String,
    enum: ["Africa", "Antarctica", "Asia", "Europe", "North America", "Oceania", "South America"],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

function arrayMinLength(val) {
  return val.length > 0
}

module.exports = mongoose.model("Destination", DestinationSchema)

