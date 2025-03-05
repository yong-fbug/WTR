import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";

const TicketCharts = ({ amPmChartData, ticketStatusData, ticketTechData }) => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", mt: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5">Tickets by Time of Day</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={amPmChartData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label={({ name, value }) => `${name}: ${value}`}>
                {amPmChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#0088FE", "#FFBB28"][index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5">Ticket Status</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ticketStatusData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label={({ name, value }) => `${name}: ${value}`}>
                {ticketStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <Box sx={{ flex: 1, mt: 4 }}>
        <Typography variant="h5">Tickets Assigned to Tech</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ticketTechData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#1a74e2" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default TicketCharts;