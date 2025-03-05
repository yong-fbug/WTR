import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

const Signup = ({ onSignup, onShowLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (password === confirmPassword) {
      // Simple signup logic (replace with real signup logic)
      onSignup();
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f0f2f5",
          padding: 2,
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 400, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSignup} fullWidth sx={{ mb: 2 }}>
            Signup
          </Button>
          <Button variant="text" onClick={onShowLogin} fullWidth>
            Already have an account? Login
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Signup;