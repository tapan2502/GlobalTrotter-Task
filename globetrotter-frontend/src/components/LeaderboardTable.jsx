import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Typography,
    Chip,
  } from "@mui/material"
  import { EmojiEvents } from "@mui/icons-material"
  
  const LeaderboardTable = ({ leaderboard }) => {
    const getRowColor = (index) => {
      switch (index) {
        case 0:
          return "rgba(255, 215, 0, 0.1)" // Gold
        case 1:
          return "rgba(192, 192, 192, 0.1)" // Silver
        case 2:
          return "rgba(205, 127, 50, 0.1)" // Bronze
        default:
          return "transparent"
      }
    }
  
    const getMedalIcon = (index) => {
      switch (index) {
        case 0:
          return <EmojiEvents sx={{ color: "#FFD700" }} /> // Gold
        case 1:
          return <EmojiEvents sx={{ color: "#C0C0C0" }} /> // Silver
        case 2:
          return <EmojiEvents sx={{ color: "#CD7F32" }} /> // Bronze
        default:
          return null
      }
    }
  
    return (
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rank</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Player</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                Score
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                Games
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                Correct
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                Accuracy
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((player, index) => (
              <TableRow
                key={player._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: getRowColor(index),
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {getMedalIcon(index)}
                    {!getMedalIcon(index) && (
                      <Typography variant="body2" sx={{ ml: getMedalIcon(index) ? 1 : 0 }}>
                        {index + 1}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32, mr: 1 }}>
                      {player.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2">{player.username}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {player.score}
                  </Typography>
                </TableCell>
                <TableCell align="right">{player.gamesPlayed}</TableCell>
                <TableCell align="right">{player.correctAnswers}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={`${Math.round((player.correctAnswers / (player.gamesPlayed || 1)) * 100)}%`}
                    color={
                      (player.correctAnswers / (player.gamesPlayed || 1)) * 100 >= 75
                        ? "success"
                        : (player.correctAnswers / (player.gamesPlayed || 1)) * 100 >= 50
                          ? "primary"
                          : "default"
                    }
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
            {leaderboard.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No leaderboard data available yet.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  export default LeaderboardTable
  
  