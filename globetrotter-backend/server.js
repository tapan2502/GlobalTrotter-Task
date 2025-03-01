const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") })

console.log(
  "OPENAI_API_KEY:",
  process.env.OPENAI_API_KEY ? `Set (last 4 characters: ${process.env.OPENAI_API_KEY.slice(-4)})` : "Not set",
)

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

// Import routes
const authRoutes = require("./routes/auth")
const gameRoutes = require("./routes/game")
const challengeRoutes = require("./routes/challenge")
const datasetRoutes = require("./routes/dataset")

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/game", gameRoutes)
app.use("/api/challenge", challengeRoutes)
app.use("/api/dataset", datasetRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Globetrotter API is running")
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// Connect to MongoDB and start server
connectDB().then(async () => {
  const PORT = process.env.PORT || 5000

  // Check if we need to seed initial data
  const Destination = require("./models/Destination")
  const count = await Destination.countDocuments()

  console.log(`Initial destination count: ${count}`)

  // Import the dataset controller
  const datasetController = require("./controllers/datasetContoller")

  if (count === 0) {
    console.log("No destinations found. Seeding initial data...")
    try {
      // Seed initial destinations
      await datasetController.seedInitialDestinations(
        {},
        {
          status: (code) => ({ json: (data) => console.log("Seed initial destinations response:", data) }),
          json: (data) => console.log("Seed initial destinations response:", data),
        },
      )

      console.log("Initial destinations seeded.")
    } catch (error) {
      console.error("Error seeding initial data:", error)
    }
  } else {
    console.log(`Database already contains ${count} destinations`)
  }

  // Always try to expand the dataset, regardless of the initial count
  console.log("Expanding dataset with OpenAI...")
  try {
    await datasetController.expandDataset(
      {
        body: { count: 20 },
      },
      {
        status: (code) => ({ json: (data) => console.log("Expand dataset response:", data) }),
        json: (data) => console.log("Expand dataset response:", data),
      },
    )
    console.log("Successfully expanded dataset with OpenAI")
  } catch (openaiError) {
    console.error("Error expanding dataset with OpenAI:", openaiError)
    console.log("Will continue with existing destinations")
  }

  // Verify the total count of destinations after seeding and expansion
  const finalCount = await Destination.countDocuments()
  console.log(`Total destinations in database after seeding and expansion: ${finalCount}`)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})

