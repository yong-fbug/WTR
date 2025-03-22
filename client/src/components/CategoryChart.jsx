import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList, CartesianGrid
} from "recharts";
import { Typography, Box, Paper, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const CustomTooltip = ({ active, payload }) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 1.5,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {payload[0].payload.name}: {payload[0].value}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const CategoryBarChart = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Category Analysis
        </Typography>
        <Typography variant="body1" color="text.disabled">
          No data available
        </Typography>
      </Box>
    );
  }

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        backgroundColor: theme.palette.background.default,
        borderRadius: 3,
        boxShadow: theme.palette.mode === "dark" ? "0px 4px 12px rgba(255,255,255,0.1)" : "0px 4px 12px rgba(0,0,0,0.1)",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        Category Analysis
      </Typography>
      <ResponsiveContainer width="100%" height={Math.max(400, data.length * 35)}>
        <BarChart data={sortedData} layout="vertical" barCategoryGap={30}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis type="number" stroke={theme.palette.text.secondary} />
          <YAxis
            dataKey="name"
            type="category"
            width={200}
            interval={0}
            stroke={theme.palette.text.secondary}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Legend />
          <Bar
            dataKey="value"
            fill={theme.palette.mode === "dark" ? "url(#darkGradient)" : "url(#lightGradient)"}
            barSize={25}
            radius={[6, 6, 6, 6]}
          >
            <LabelList dataKey="value" position="insideLeft" fill="#fff" fontSize={14} fontWeight="bold" />
          </Bar>
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="lightGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#36A2EB" />
              <stop offset="100%" stopColor="#007BFF" />
            </linearGradient>
            <linearGradient id="darkGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6384" />
              <stop offset="100%" stopColor="#FF416C" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

CategoryBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CategoryBarChart;
