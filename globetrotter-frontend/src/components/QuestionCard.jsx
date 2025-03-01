"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material"
import { LightbulbOutlined, CheckCircleOutline, CancelOutlined } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useGame } from "../hooks/useGame"

const QuestionCard = () => {
  const { currentQuestion, result, isLoading, answerQuestion, fetchQuestion, clearResult } = useGame()
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const isFetchingRef = useRef(false)

  const handleSelectAnswer = useCallback(
    (answer) => {
      if (result) return // Prevent selecting after result is shown
      setSelectedAnswer(answer)
    },
    [result],
  )

  const handleSubmitAnswer = useCallback(async () => {
    if (!selectedAnswer || !currentQuestion) return
    await answerQuestion(currentQuestion.id, selectedAnswer)
  }, [selectedAnswer, currentQuestion, answerQuestion])

  const handleNextQuestion = useCallback(() => {
    setSelectedAnswer(null)
    clearResult()
    fetchQuestion()
  }, [clearResult, fetchQuestion])

  useEffect(() => {
    if (!currentQuestion && !isLoading && !isFetchingRef.current) {
      isFetchingRef.current = true
      fetchQuestion().finally(() => {
        isFetchingRef.current = false
      })
    }
  }, [currentQuestion, isLoading, fetchQuestion])

  if (isLoading) {
    return (
      <Card sx={{ minHeight: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Card>
    )
  }

  if (!currentQuestion) {
    return (
      <Card
        sx={{
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ready to test your geography knowledge?
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={fetchQuestion} sx={{ mt: 2 }}>
          Start Game
        </Button>
      </Card>
    )
  }

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LightbulbOutlined color="warning" sx={{ mr: 1 }} />
          <Typography variant="h5" component="div">
            Where in the world?
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Based on these clues, guess the destination:
          </Typography>
          <List sx={{ bgcolor: "background.paper", borderRadius: 1, border: "1px solid", borderColor: "divider" }}>
            {currentQuestion.clues.map((clue, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <Chip label={`Clue ${index + 1}`} size="small" color="primary" variant="outlined" sx={{ mr: 2 }} />
                <Typography variant="body1">{clue}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        {!result ? (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Select your answer:
            </Typography>
            <List>
              {currentQuestion.options.map((option, index) => (
                <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <ListItemButton
                    onClick={() => handleSelectAnswer(option)}
                    selected={selectedAnswer === option}
                    sx={{
                      mb: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      "&.Mui-selected": {
                        bgcolor: "primary.light",
                        color: "primary.contrastText",
                        "&:hover": {
                          bgcolor: "primary.main",
                        },
                      },
                    }}
                    className="answer-option"
                  >
                    <ListItemText primary={option} />
                  </ListItemButton>
                </motion.div>
              ))}
            </List>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!selectedAnswer}
                onClick={handleSubmitAnswer}
              >
                Submit Answer
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor: result.isCorrect ? "success.light" : "error.light",
                borderRadius: 1,
                mb: 3,
              }}
            >
              {result.isCorrect ? (
                <CheckCircleOutline sx={{ color: "success.dark", mr: 1 }} />
              ) : (
                <CancelOutlined sx={{ color: "error.dark", mr: 1 }} />
              )}
              <Typography variant="h6">{result.isCorrect ? "Correct!" : "Incorrect!"}</Typography>
            </Box>

            <Typography variant="body1" gutterBottom>
              The correct answer is: <strong>{result.correctAnswer}</strong>
            </Typography>

            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="body1" fontWeight="medium" gutterBottom>
                Fun Fact:
              </Typography>
              <Typography variant="body2">{result.funFact}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleNextQuestion}
                disabled={isFetchingRef.current}
              >
                {isFetchingRef.current ? "Loading..." : "Next Question"}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default QuestionCard

