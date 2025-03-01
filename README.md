GlobeTrotter

GlobeTrotter is an interactive travel quiz game where players test their geography knowledge by guessing destinations based on AI-generated clues. Designed for travel enthusiasts and trivia lovers, the game provides fun and engaging challenges with a mix of text-based hints.

Table of Contents

Features

Technologies Used

Prerequisites

Installation

Environment Variables

Usage

API Endpoints

Database Schema

OpenAI Integration

Deployment

Features

User authentication and authorization using JWT

Dynamic question generation using OpenAI's GPT model

RESTful API for game logic and user interactions

MongoDB integration for data persistence

Challenge mode for competitive gameplay

Leaderboard functionality

Automatic dataset expansion with OpenAI

Profile management for users

Technologies Used

Node.js

Express.js

MongoDB with Mongoose ODM

JSON Web Tokens (JWT) for authentication

OpenAI API for dynamic content generation

Bcrypt for password hashing

Dotenv for environment variable management

Prerequisites

Before you begin, ensure you have met the following requirements:

Node.js (v14 or later)

MongoDB (local instance or cloud-based service like MongoDB Atlas)

OpenAI API key

Git (for version control)

Installation

Clone the repository:

git clone https://github.com/your-username/globetrotter-backend.git
cd globetrotter-backend

Install dependencies:

npm install

Set up environment variables (see Environment Variables section)

Seed the initial dataset:

npm run seed

Environment Variables

Create a .env file in the root directory and add the following environment variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
OPENAI_API_KEY=your_openai_api_key
PORT=5000

Replace the placeholder values with your actual configuration details.

Usage

To start the server in development mode:

npm run dev

For production:

npm start

API Endpoints

Authentication

POST /api/auth/register - Register a new user

POST /api/auth/login - User login

Game

GET /api/game/question - Get a random question

POST /api/game/answer - Submit an answer

Challenge

GET /api/challenge - Get current challenge

POST /api/challenge/join - Join a challenge

Leaderboard

GET /api/leaderboard - Get leaderboard data

Profile

GET /api/profile - Get user profile

PUT /api/profile - Update user profile

Dataset

POST /api/dataset/seed - Seed initial dataset (admin only)

POST /api/dataset/expand - Expand dataset using OpenAI (admin only)

For detailed API documentation, including request/response formats, please refer to the API.md file.

Database Schema

User

username: String (unique)

email: String (unique)

password: String (hashed)

score: Number

gamesPlayed: Number

createdAt: Date

Destination

name: String

country: String

description: String

funFacts: [String]

questions: [
{
text: String,
options: [String],
correctAnswer: String
}
]

Challenge

startDate: Date

endDate: Date

participants: [User]

leaderboard: [
{
user: User,
score: Number
}
]

OpenAI Integration

The Globetrotter Backend uses OpenAI's GPT model to dynamically generate new destinations and questions. This integration allows for an ever-expanding dataset, keeping the game fresh and engaging for players.

Key integration points:

expandDataset function in datasetController.js

Automatic dataset expansion when the number of destinations falls below a threshold

Deployment

GlobeTrotter can be deployed using Render for the backend and Netlify for the frontend.

Backend Deployment (Render)

Push Code to GitHubEnsure your backend repository is hosted on GitHub.

Create a Render Web Service

Go to Render and log in.

Click on New Web Service and connect your GitHub repository.

Select Node.js as the environment.

Set Environment VariablesIn the Render Dashboard, add the following environment variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
OPENAI_API_KEY=your_openai_api_key
PORT=5000

Build & Start Command

Build Command: npm install

Start Command: npm start

DeployClick on Deploy and wait for the build to complete. Your backend API will be live on https://your-app.onrender.com.

Frontend Deployment (Netlify)

Push Code to GitHubEnsure your frontend code is hosted on GitHub.

Deploy to Netlify

Go to Netlify and log in.

Click New Site from Git and select your frontend repository.

Set the build command: npm run build

Set the publish directory: build/

Set Environment Variables (If Required)In the Netlify Dashboard, add any required frontend environment variables.

DeployClick Deploy Site, and your frontend will be live on a Netlify domain like https://your-app.netlify.app.

This setup ensures a smooth deployment process for both the backend (Render) and frontend (Netlify), making the game fully accessible online. 🚀

