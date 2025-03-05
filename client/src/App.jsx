import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import WeeklyReportPage from "./pages/weeklyReportPage.jsx";
import DailyReportPage from "./pages/dailyReportPage.jsx";
import { GlobalStyles } from "@mui/material";
import Login from './components/Login';
import Signup from './components/Signup';
import { AnimatePresence } from "framer-motion";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleShowLogin = () => {
    setShowSignup(false);
  };

  const handleSignup = () => {
    setShowSignup(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <AnimatePresence>
          {!showSignup && <Login onLogin={handleLogin} onShowSignup={handleShowSignup} key="login" />}
          {showSignup && <Signup onSignup={handleSignup} onShowLogin={handleShowLogin} key="signup" />}
        </AnimatePresence>
      </Box>
    );
  }

  return (
    <Router>
      <GlobalStyles
        styles={{
          "::-webkit-scrollbar": {
            width: "8px",
          },
          "::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      />

      <main style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Box
          sx={{ 
            width: isSidebarOpen ? "250px" : "60px",
            height: "100vh",
            position: "fixed",
            backgroundColor: "#f8f9fa",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 2,
            transition: "width 0.3s ease",
            overflow: "hidden",
          }}
        >
          {/* Toggle Button */}
          <IconButton
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            sx={{
              position: "absolute",
              top: 10,
              left: isSidebarOpen ? 210 : 10,
              transition: "left 0.3s ease",
              zIndex: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Navigation Links */}
          {isSidebarOpen && (
            <Box>
              <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
                Menu
              </Typography>
              <NavigationLinks handleLogout={handleLogout} />
            </Box>
          )}

          {/* User Account & Logout */}
          {isSidebarOpen && (
            <Box sx={{ marginBottom: 5 }}>
              <Divider sx={{ marginBottom: 2 }} />
              <List>
                <ListItem>
                  <PersonIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary="OJT-Ravago" />
                </ListItem>
                
                <ListItem>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<LogoutIcon />} 
                    className="bg-black" onClick={handleLogout}>
                    Logout
                  </Button>
                </ListItem>
              </List>
            </Box>
          )}
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            marginLeft: isSidebarOpen ? "250px" : "60px",
            flexGrow: 1,
            padding: 3,
            overflowY: "auto",
            height: "100vh",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/weekly-report" element={<WeeklyReportPage />} />
            <Route path="/daily-report" element={<DailyReportPage />} />
            <Route path="/" element={<Typography variant="h4">Report Dashboard</Typography>} />
          </Routes>
        </Box>
      </main>
    </Router>
  );
}

function NavigationLinks({ handleLogout }) {
  const location = useLocation();

  return (
    <>
      <List>
        <ListItem
          button
          component={Link}
          to="/daily-report"
          sx={{
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: location.pathname === "/daily-report" ? "100%" : "0%",
              height: "2px",
              backgroundColor: "primary.main",
              position: "absolute",
              bottom: 0,
              left: 0,
              transition: "width 0.3s ease-in-out",
            },
            "&:hover::after": {
              width: "100%",
            },
          }}
        >
          <EventNoteIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Daily Report" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/weekly-report"
          sx={{
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: location.pathname === "/weekly-report" ? "100%" : "0%",
              height: "2px",
              backgroundColor: "primary.main",
              position: "absolute",
              bottom: 0,
              left: 0,
              transition: "width 0.3s ease-in-out",
            },
            "&:hover::after": {
              width: "100%",
            },
          }}
        >
          <EventNoteIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Weekly Report" />
        </ListItem>
      </List>
    </>
  );
}

export default App;