import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const TicketStats = ({ totalTickets, ticketStatusData, ticketTechData, filteredTickets }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Count tickets by weekday
  const weekdayTickets = daysOfWeek.reduce((acc, day) => {
    acc[day] = filteredTickets.filter(ticket => {
      const ticketDate = new Date(ticket["Date Submitted"]);
      return ticketDate.toLocaleDateString("en-US", { weekday: "long" }) === day;
    }).length;
    return acc;
  }, {});

  // Get Most Active Tech
  const mostActiveTech = ticketTechData.length > 0
    ? ticketTechData.reduce((max, t) => (t.value > max.value ? t : max), ticketTechData[0]).name
    : "N/A";

  // Get Most Common Category
  const mostCommonCategory = filteredTickets.length > 0
    ? Object.entries(filteredTickets.reduce((acc, t) => {
        acc[t.Category] = (acc[t.Category] || 0) + 1;
        return acc;
      }, {})).reduce((max, c) => (c[1] > max[1] ? c : max), ["N/A", 0])[0]
    : "N/A";

  // Calculate Pending and Resolved Tickets
  const pendingTickets = ticketStatusData.find(t => t.name === "Open")?.value || 0;
  const resolvedTickets = ticketStatusData.find(t => t.name === "Closed")?.value || 0;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
      {/* Total Week Tickets */}
      <Card sx={{ flex: 1, p: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6"><b>Total Week Tickets</b></Typography>
          <Typography variant="h4">{totalTickets}</Typography>
        </CardContent>
      </Card>

      {/* Monday-Friday total tickets */}
      {daysOfWeek.map((day) => (
        <Card key={day} sx={{ flex: 1, p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6"><b>{day} Tickets</b></Typography>
            <Typography variant="h4">{weekdayTickets[day]}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Additional Stats */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, width: "100%" }}>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6"><b>Pending Tickets</b></Typography>
            <Typography variant="h4">{pendingTickets}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6"><b>Resolved Tickets</b></Typography>
            <Typography variant="h4">{resolvedTickets}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6"><b>Most Active Tech</b></Typography>
            <Typography variant="h5">{mostActiveTech}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6"><b>Most Common Category</b></Typography>
            <Typography variant="h6">{mostCommonCategory}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

TicketStats.propTypes = {
  totalTickets: PropTypes.number.isRequired,
  ticketStatusData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  ticketTechData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  filteredTickets: PropTypes.arrayOf(
    PropTypes.shape({
      "Ticket Number": PropTypes.string.isRequired,
      "Date Submitted": PropTypes.string.isRequired,
      "Requestor Email": PropTypes.string.isRequired,
      "Status": PropTypes.string.isRequired,
      "Assigned Tech Support": PropTypes.string.isRequired,
      "Category": PropTypes.string.isRequired,
      "Sub-Category": PropTypes.string.isRequired,
      "Sub-Sub-Category": PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TicketStats;