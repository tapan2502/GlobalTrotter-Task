"use client"
import { Card, CardContent, Typography, Box, LinearProgress, Divider } from "@mui/material"
import { motion } from "framer-motion"

const StatsCard = ({ title, value, icon, color, progress, subtitle }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="stats-card">
      <Card sx={{ height: "100%", borderTop: `4px solid ${color}` }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="div" color="text.secondary">
              {title}
            </Typography>
            <Box
              sx={{
                backgroundColor: `${color}20`,
                borderRadius: "50%",
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          </Box>

          <Typography variant="h4" component="div" fontWeight="bold">
            {value}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}

          {progress !== undefined && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: `${color}30`,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: color,
                      },
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default StatsCard

