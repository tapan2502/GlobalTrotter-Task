"use client"
import { Link as RouterLink } from "react-router-dom"
import { Container, Typography, Button, Box } from "@mui/material"
import { motion } from "framer-motion"
import { SentimentVeryDissatisfied as SadFaceIcon } from "@mui/icons-material"

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SadFaceIcon sx={{ fontSize: 100, color: "text.secondary", mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Oops! Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" color="primary" size="large">
            Go to Homepage
          </Button>
        </motion.div>
      </Box>
    </Container>
  )
}

export default NotFound

