import React from "react";
import PropTypes from "prop-types";

const TicketStats = ({ totalTickets, ticketStatusData, ticketTechData, tickets }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weekdayTickets = daysOfWeek.reduce((acc, day) => {
    acc[day] = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket["Date Submitted"]);
      return ticketDate.toLocaleDateString("en-US", { weekday: "long" }) === day;
    }).length;
    return acc;
  }, {});

  const mostActiveTech =
    ticketTechData.length > 0
      ? ticketTechData.reduce((max, t) => (t.value > max.value ? t : max), ticketTechData[0]).name
      : "N/A";

  const mostCommonCategory =
    tickets.length > 0
      ? Object.entries(
          tickets.reduce((acc, t) => {
            acc[t.Category] = (acc[t.Category] || 0) + 1;
            return acc;
          }, {})
        ).reduce((max, c) => (c[1] > max[1] ? c : max), ["N/A", 0])[0]
      : "N/A";

  const pendingTickets = ticketStatusData.find((t) => t.name === "Open")?.value || 0;
  const resolvedTickets = ticketStatusData.find((t) => t.name === "Closed")?.value || 0;

  return (
    <div className="flex flex-col items-center w-full p-6">
      {/* Current Date */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">{currentDate}</h1>

      {/* Total Tickets */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-center">
        <h2 className="text-lg font-semibold text-gray-600 uppercase">Total Tickets</h2>
        <p className="text-3xl font-bold text-gray-800">{totalTickets}</p>
      </div>

      {/* Weekday Tickets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-5xl mt-6">
        {daysOfWeek.map((day) => {
          const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
          const isToday = today === day;
          const ticketCount = weekdayTickets[day] || 0;

          return (
            <div
              key={day}
              className={`relative p-6 text-center rounded-xl transition-all border 
                ${
                  ticketCount === 0
                    ? "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
                    :"bg-gray-200 text-gray-500 border-gray-400"
                }`}
            >
              <h3 className="text-lg font-semibold">{day} Tickets</h3>
              <p className="text-2xl font-bold">{ticketCount}</p>
            </div>
          );
        })}
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mt-8">
        <StatCard title="Pending Tickets" value={pendingTickets} />
        <StatCard title="Resolved Tickets" value={resolvedTickets} />
        <StatCard title="Most Active Tech" value={mostActiveTech} />
        <StatCard title="Most Common Category" value={mostCommonCategory} />
      </div>
    </div>
  );
};

  // Reusable stat card component
  const StatCard = ({ title, value }) => (
    <div className="p-6 text-center bg-white border border-gray-200 shadow-md rounded-xl hover:bg-gray-100 transition">
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
        Status: PropTypes.string.isRequired,
        "Assigned Tech Support": PropTypes.string.isRequired,
        Category: PropTypes.string.isRequired,
        "Sub-Category": PropTypes.string.isRequired,
        "Sub-Sub-Category": PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default TicketStats;
