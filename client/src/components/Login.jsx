import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

const Login = ({ onLogin, onShowSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple authentication logic (replace with real authentication)
    if (username === "ojt-ravago" && password === "ojt") {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
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
            Login
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
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mb: 2 }}>
            Login
          </Button>
          <Button variant="text" onClick={onShowSignup} fullWidth>
            Don't have an account? Signup
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Login;