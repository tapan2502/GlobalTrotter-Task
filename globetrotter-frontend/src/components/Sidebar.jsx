import { Link as RouterLink, useLocation } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material"
import {
  Home as HomeIcon,
  EmojiEvents as LeaderboardIcon,
  SportsEsports as GameIcon,
  People as ChallengeIcon,
  Person as ProfileIcon,
} from "@mui/icons-material"
import { useAuth } from "../hooks/useAuth"

const drawerWidth = 240

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Play Game", icon: <GameIcon />, path: "/game" },
  { text: "Challenges", icon: <ChallengeIcon />, path: "/challenge" },
  { text: "Leaderboard", icon: <LeaderboardIcon />, path: "/leaderboard" },
]

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuth()
  const location = useLocation()

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onClose}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/profile"
            selected={location.pathname === "/profile"}
            onClick={onClose}
          >
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </ListItem>
      </List>
      {user && (
        <Box sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Score: {user.score}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Games: {user.gamesPlayed}
          </Typography>
        </Box>
      )}
    </div>
  )

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, mt: "64px", pt: 0 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar

