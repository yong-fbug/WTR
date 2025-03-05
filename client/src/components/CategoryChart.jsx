import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB", "#FFCE56"];

const CategoryPieChart = ({ data }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6">Category Analysis</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryPieChart;