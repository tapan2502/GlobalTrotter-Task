"use client"

import React, { useEffect } from "react"
import { Container, Typography } from "@mui/material"
import { motion } from "framer-motion"
import QuestionCard from "../components/QuestionCard"
import { useGame } from "../hooks/useGame"

const Game = React.memo(() => {
  const { clearQuestion } = useGame()

  useEffect(() => {
    return () => {
      clearQuestion()
    }
  }, [clearQuestion])

  return (
    <Container maxWidth="md">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Geography Quiz
        </Typography>
        <Typography variant="body1" paragraph>
          Test your knowledge of world geography with this fun and challenging quiz!
        </Typography>
        <QuestionCard />
      </motion.div>
    </Container>
  )
})

export default Game

