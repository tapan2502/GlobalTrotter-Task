const express = require("express")
const router = express.Router()
const {
  seedInitialDestinations,
  expandDataset,
  getAllDestinations,
  addDestination,
} = require("../controllers/datasetContoller")

// Seed initial destinations
router.post("/seed", seedInitialDestinations)

// Expand dataset using OpenAI
router.post("/expand", expandDataset)

// Get all destinations
router.get("/destinations", getAllDestinations)

// Add new destination
router.post("/destination", addDestination)

module.exports = router

