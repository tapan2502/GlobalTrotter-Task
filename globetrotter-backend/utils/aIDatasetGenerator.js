const { OpenAI } = require("openai")

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

/**
 * Generate destinations using OpenAI
 * @param {number} count - Number of destinations to generate
 * @param {Array} existingNames - Array of existing destination names to avoid duplicates
 * @returns {Promise<Array>} - Array of generated destinations
 */
const generateDestinations = async (count = 10, existingNames = []) => {
  try {
    // Limit the number of destinations to generate per request
    const batchSize = 10
    const batches = Math.ceil(count / batchSize)
    let allDestinations = []

    for (let i = 0; i < batches; i++) {
      const currentBatchSize = Math.min(batchSize, count - i * batchSize)

      // Skip if batch size is 0 or negative
      if (currentBatchSize <= 0) break

      const prompt = `Generate ${currentBatchSize} famous travel destinations with the following information for each:
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

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
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

      try {
        // Extract JSON from the response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const batchDestinations = JSON.parse(jsonMatch[0])
          allDestinations = [...allDestinations, ...batchDestinations]

          // Update existing names to avoid duplicates in subsequent batches
          existingNames = [...existingNames, ...batchDestinations.map((dest) => dest.name.toLowerCase())]
        } else {
          throw new Error("No valid JSON found in the response")
        }
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError)
        throw parseError
      }
    }

    return allDestinations
  } catch (error) {
    console.error("Error generating destinations:", error)
    throw error
  }
}

module.exports = { generateDestinations }

