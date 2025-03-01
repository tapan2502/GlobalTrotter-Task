const Destination = require("../models/Destination")
const OpenAI = require("openai")

// Log a masked version of the API key for debugging
const apiKey = process.env.OPENAI_API_KEY;

console.log("API Key (last 4 characters):", apiKey ? apiKey.slice(-4) : "Not set")

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// @desc    Seed initial destinations
// @route   POST /api/dataset/seed
// @access  Private (Admin only in production)
exports.seedInitialDestinations = async (req, res) => {
  try {
    // Check if destinations already exist
    const count = await Destination.countDocuments()

    if (count > 0) {
      console.log(`seedInitialDestinations: Database already contains ${count} destinations`)
      return res.status(400).json({
        message: "Database already seeded",
        count,
      })
    }

    // Initial dataset from the requirements
    const initialDestinations = [
      {
        alias: "dst1",
        name: "Paris",
        clues: ["Home to a famous tower finished in 1889", "Called the City of Light"],
        funFacts: ["The Louvre is the world's largest art museum.", "Famous for café culture and haute cuisine."],
        difficulty: "easy",
        continent: "Europe",
        country: "France",
      },
      {
        alias: "dst2",
        name: "Tokyo",
        clues: ["Capital city with over 13 million residents", "Known for high-tech, anime, and cherry blossoms"],
        funFacts: [
          "It's the most populous metropolitan area in the world.",
          "Tsukiji once was the world's largest fish market.",
        ],
        difficulty: "medium",
        continent: "Asia",
        country: "Japan",
      },
      {
        alias: "dst3",
        name: "New York City",
        clues: ["Known as the Big Apple", "Home to a famous statue gifted by France"],
        funFacts: ["More than 800 languages are spoken in this city.", "The subway system has 472 stations."],
        difficulty: "easy",
        continent: "North America",
        country: "United States",
      },
    ]

    // Insert initial destinations
    const insertedDestinations = await Destination.insertMany(initialDestinations)
    console.log(`seedInitialDestinations: Inserted ${insertedDestinations.length} initial destinations`)

    res.status(201).json({
      success: true,
      message: "Initial destinations seeded successfully",
      count: insertedDestinations.length,
    })
  } catch (error) {
    console.error("Error in seedInitialDestinations:", error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Expand dataset using OpenAI
// @route   POST /api/dataset/expand
// @access  Private (Admin only in production)
exports.expandDataset = async (req, res) => {
  try {
    console.log("expandDataset function called")
    const { count = 10 } = req.body
    console.log(`Requested to generate ${count} new destinations`)

    // Limit the number of destinations to generate
    const limitedCount = Math.min(count, 20)

    // Get existing destinations to avoid duplicates
    const existingDestinations = await Destination.find().select("name")
    const existingNames = existingDestinations.map((dest) => dest.name.toLowerCase())

    console.log(`Expanding dataset with ${limitedCount} new destinations...`)
    console.log(`OpenAI API Key status: ${process.env.OPENAI_API_KEY ? "Set" : "Not set"}`)
    console.log(
      "API Key (last 4 characters):",
      process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.slice(-4) : "Not set",
    )

    // Generate new destinations using OpenAI
    const prompt = `Generate ${limitedCount} famous travel destinations with the following information for each:
1. Name of the destination (city, landmark, or natural wonder)
2. 3-4 cryptic clues that hint at the destination without directly naming it
3. 3-4 interesting fun facts about the destination
4. Difficulty level (easy, medium, or hard)
5. Continent
6. Country

Format the response as a valid JSON array with objects having these properties:
- name (string)
- clues (array of strings)
- funFacts (array of strings)
- difficulty (string: "easy", "medium", or "hard")
- continent (string)
- country (string)

Make sure the destinations are diverse across continents and countries. Ensure none of these destinations are in the list: ${existingNames.join(", ")}`

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a travel expert who provides accurate and interesting information about global destinations.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      })

      // Parse the response
      const responseText = completion.choices[0].message.content
      console.log("OpenAI response received:", responseText)

      let newDestinations

      try {
        // Extract JSON from the response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          newDestinations = JSON.parse(jsonMatch[0])
          console.log(`Successfully parsed ${newDestinations.length} destinations from OpenAI response`)
        } else {
          throw new Error("No valid JSON found in the response")
        }
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError)
        return res.status(500).json({
          message: "Error parsing AI-generated data",
          error: parseError.message,
        })
      }

      // Add alias to each destination
      const existingCount = await Destination.countDocuments()
      const destinationsWithAlias = newDestinations.map((dest, index) => ({
        ...dest,
        alias: `dst${existingCount + index + 1}`,
      }))

      // Insert new destinations
      console.log(`Attempting to insert ${destinationsWithAlias.length} new destinations`)
      const insertedDestinations = await Destination.insertMany(destinationsWithAlias)
      console.log(`Successfully inserted ${insertedDestinations.length} new destinations`)

      res.status(201).json({
        success: true,
        message: `Successfully added ${insertedDestinations.length} new destinations`,
        count: insertedDestinations.length,
        destinations: insertedDestinations.map((dest) => ({
          name: dest.name,
          continent: dest.continent,
          country: dest.country,
        })),
      })
    } catch (openaiError) {
      console.error("OpenAI API Error:", openaiError)
      res.status(500).json({ message: "OpenAI API Error", error: openaiError.message })
    }
  } catch (error) {
    console.error("Error in expandDataset:", error)
    res.status(500).json({ message: "Server Error", error: error.toString() })
  }
}

// @desc    Get all destinations (admin only)
// @route   GET /api/dataset/destinations
// @access  Private (Admin only in production)
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()

    res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// @desc    Add a new destination manually
// @route   POST /api/dataset/destination
// @access  Private (Admin only in production)
exports.addDestination = async (req, res) => {
  try {
    const { name, clues, funFacts, difficulty, continent, country, imageUrl } = req.body

    // Check if destination already exists
    const existingDestination = await Destination.findOne({ name })

    if (existingDestination) {
      return res.status(400).json({ message: "Destination already exists" })
    }

    // Generate alias
    const count = await Destination.countDocuments()
    const alias = `dst${count + 1}`

    // Create new destination
    const destination = await Destination.create({
      alias,
      name,
      clues,
      funFacts,
      difficulty,
      continent,
      country,
      imageUrl,
    })

    res.status(201).json({
      success: true,
      destination,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

