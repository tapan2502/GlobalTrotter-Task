# GlobeTrotter
GlobeTrotter is an interactive travel quiz game where players test their geography knowledge by guessing destinations based on AI-generated clues. Designed for travel enthusiasts and trivia lovers, the game provides fun and engaging challenges with a mix of text-based hints


## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)
9. [OpenAI Integration](#openai-integration)


## Features

- User authentication and authorization using JWT
- Dynamic question generation using OpenAI's GPT model
- RESTful API for game logic and user interactions
- MongoDB integration for data persistence
- Challenge mode for competitive gameplay
- Leaderboard functionality
- Automatic dataset expansion with OpenAI
- Profile management for users


## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- OpenAI API for dynamic content generation
- Bcrypt for password hashing
- Dotenv for environment variable management


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- MongoDB (local instance or cloud-based service like MongoDB Atlas)
- OpenAI API key
- Git (for version control)


## Installation

1. Clone the repository:

plaintext
git clone https://github.com/your-username/globetrotter-backend.git
cd globetrotter-backend



2. Install dependencies:

plaintext
npm install



3. Set up environment variables (see [Environment Variables](#environment-variables) section)
4. Seed the initial dataset:

plaintext
npm run seed





## Environment Variables

Create a .env file in the root directory and add the following environment variables:

plaintext
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
OPENAI_API_KEY=your_openai_api_key
PORT=5000


Replace the placeholder values with your actual configuration details.

## Usage

To start the server in development mode:

plaintext
npm run dev


For production:

plaintext
npm start


## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login


### Game

- GET /api/game/question - Get a random question
- POST /api/game/answer - Submit an answer


### Challenge

- GET /api/challenge - Get current challenge
- POST /api/challenge/join - Join a challenge


### Leaderboard

- GET /api/leaderboard - Get leaderboard data


### Profile

- GET /api/profile - Get user profile
- PUT /api/profile - Update user profile


### Dataset

- POST /api/dataset/seed - Seed initial dataset (admin only)
- POST /api/dataset/expand - Expand dataset using OpenAI (admin only)


For detailed API documentation, including request/response formats, please refer to the API.md file.

## Database Schema

### User

- username: String (unique)
- email: String (unique)
- password: String (hashed)
- score: Number
- gamesPlayed: Number
- createdAt: Date


### Destination

- name: String
- country: String
- description: String
- funFacts: [String]
- questions: [
{
text: String,
options: [String],
correctAnswer: String
}
]


### Challenge

- startDate: Date
- endDate: Date
- participants: [User]
- leaderboard: [
{
user: User,
score: Number
}
]


## OpenAI Integration

The Globetrotter Backend uses OpenAI's GPT model to dynamically generate new destinations and questions. This integration allows for an ever-expanding dataset, keeping the game fresh and engaging for players.

Key integration points:

- expandDataset function in datasetController.js
- Automatic dataset expansion when the number of destinations falls below a threshold
