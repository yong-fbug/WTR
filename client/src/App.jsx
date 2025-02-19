import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import TodayIcon from "@mui/icons-material/Today";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import DailyReportPage from "./pages/DailyReportPage";
import { GlobalStyles } from "@mui/material";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
              <List>
                <ListItem button component={Link} to="/weekly-report">
                  <EventNoteIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary="Weekly Report" />
                </ListItem>
                <ListItem button component={Link} to="/daily-report">
                  <TodayIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary="Daily Report" />
                </ListItem>
              </List>
            </Box>
          )}

          {/* User Account & Logout */}
          {isSidebarOpen && (
            <Box>
              <Divider sx={{ marginBottom: 2 }} />
              <List>
                <ListItem>
                  <PersonIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary="User Account" />
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="secondary" fullWidth startIcon={<LogoutIcon />}>
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

export default App;
