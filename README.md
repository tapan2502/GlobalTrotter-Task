# GlobeTrotter
GlobeTrotter is an interactive travel quiz game where players test their geography knowledge by guessing destinations based on AI-generated clues. Designed for travel enthusiasts and trivia lovers, the game provides fun and engaging challenges with a mix of text-based hints.

## Table of Contents

1. [Tech Choice](#tech-choice)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [Usage](#usage)
8. [API Endpoints](#api-endpoints)
9. [Database Schema](#database-schema)
10. [OpenAI Integration](#openai-integration)
11. [Deployment](#deployment)

## Tech Choice

GlobeTrotter is a MERN stack project utilizing essential frontend and backend libraries for seamless performance.

### Frontend (React + Vite)

```json
{
  "name": "globetrotter-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.6",
    "@mui/material": "^6.4.6",
    "@reduxjs/toolkit": "^2.6.0",
    "axios": "^1.8.1",
    "confetti-js": "^0.0.18",
    "framer-motion": "^12.4.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.2.0",
    "react-toastify": "^11.0.5",
    "redux-persist": "^6.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "vite": "^6.2.0"
  }
}
```

### Backend (Node.js + Express)

```json
{
  "name": "globetrotter-backend",
  "version": "1.0.0",
  "description": "Backend for the Globetrotter geography quiz game",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required for backend'"
  },
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cloudinary": "^2.5.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.11.0",
    "multer": "^1.4.5-lts.1",
    "openai": "^4.86.1"
  }
}
```

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

```sh
git clone https://github.com/your-username/globetrotter-backend.git
cd globetrotter-backend
```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)
4. Seed the initial dataset:

```sh
npm run seed
```

## Deployment

The Globetrotter project is deployed as follows:

- **Backend**: Hosted on Render
- **Frontend**: Hosted on Netlify
- **Live URL**: [Globetrotter Live](https://globetrotter-task.netlify.app/)

To deploy your own version:

1. **Deploy Backend on Render:**
   - Push your code to GitHub.
   - Create a new service on Render.
   - Connect your GitHub repository.
   - Set up the environment variables.
   - Deploy and monitor logs.

2. **Deploy Frontend on Netlify:**
   - Push your frontend code to GitHub.
   - Link the repository to Netlify.
   - Configure build settings (`npm run build`).
   - Deploy and verify the site.

Now your project is live and accessible via the provided URL!

