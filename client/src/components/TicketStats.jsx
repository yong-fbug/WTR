
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";

const TicketStats = ({ totalTickets, ticketStatusData, ticketTechData, tickets }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Count tickets by weekday
  const weekdayTickets = daysOfWeek.reduce((acc, day) => {
    acc[day] = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket["Date Submitted"]);
      return ticketDate.toLocaleDateString("en-US", { weekday: "long" }) === day;
    }).length;
    return acc;
  }, {});

  // Get Most Active Tech
  const mostActiveTech =
    ticketTechData.length > 0
      ? ticketTechData.reduce((max, t) => (t.value > max.value ? t : max), ticketTechData[0]).name
      : "N/A";

  // Get Most Common Category
  const mostCommonCategory =
  tickets.length > 0
      ? Object.entries(
        tickets.reduce((acc, t) => {
            acc[t.Category] = (acc[t.Category] || 0) + 1;
            return acc;
          }, {})
        ).reduce((max, c) => (c[1] > max[1] ? c : max), ["N/A", 0])[0]
      : "N/A";

  // Calculate Pending and Resolved Tickets
  const pendingTickets = ticketStatusData.find((t) => t.name === "Open")?.value || 0;
  const resolvedTickets = ticketStatusData.find((t) => t.name === "Closed")?.value || 0;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ width: "100%", textAlign: "center", fontSize: 50 }} >
        {currentDate}
      </Typography>

      {/* Total Week Tickets */}
      <Card sx={{ flex: 1, p: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6">
            <b className="uppercase">Total Tickets</b>
          </Typography>
          <Typography variant="h4">{totalTickets}</Typography>
        </CardContent>
      </Card>

      {/* Monday-Friday total tickets */}
      {/* Monday-Friday total tickets */}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {daysOfWeek.map((day) => {
          const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
          const isToday = today === day;
          const hasValue = weekdayTickets[day] > 0 
          return (
            <Grid item xs={12} sm={6} md={4} lg={2} key={day}>
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: isToday || hasValue ? "0 0 20px 5px rgba(0, 0, 0, 0.5)" : "none", // glow effect for today
                  border: isToday || hasValue ? "2px solid" : "1px solid rgba(204, 204, 204, 0.7)", // Border matching glow
                  transition: "box-shadow 0.3s ease, border 0.3s ease", // Smooth transition
                }}
              >

                <CardContent>
                  <Typography variant="h6">
                    <b>{day} Tickets</b>
                  </Typography>
                  <Typography variant="h4">{weekdayTickets[day]}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Additional Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",   // On mobile, one card per row
            sm: "repeat(2, 1fr)",   // On small screens, two cards per row
            md: "repeat(3, 1fr)",   // On medium screens, three cards per row
            lg: "repeat(4, 1fr)",   // On large screens, four cards per row
          },
          gap: 2,
          width: "100%",
        }}
      >
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">
              <b>Pending Tickets</b>
            </Typography>
            <Typography variant="h4">{pendingTickets}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">
              <b>Resolved Tickets</b>
            </Typography>
            <Typography variant="h4">{resolvedTickets}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">
              <b>Most Active Tech</b>
            </Typography>
            <Typography variant="h5">{mostActiveTech}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">
              <b>Most Common Category</b>
            </Typography>
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
  tickets: PropTypes.arrayOf(
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
