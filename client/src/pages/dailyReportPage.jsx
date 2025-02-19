import React, { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Container, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Card, CardContent
} from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";


export default function TicketReport() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const textAreaRef = useRef(null);

  const handlePaste = () => {
    const text = textAreaRef.current.value;
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
    const headers = ["Ticket Number", "Date Submitted", "Requestor Email", "Status", "Assigned Tech Support", "Category"];
    const data = [];
    let ticket = {};
    let currentHeader = null;

    lines.forEach(line => {
      if (headers.includes(line)) {
        currentHeader = line;
      } else if (currentHeader) {
        ticket[currentHeader] = line;
        currentHeader = null;
      }
      if (Object.keys(ticket).length === headers.length) {
        data.push(ticket);
        ticket = {};
      }
    });

    setTickets(prevTickets => [...prevTickets, ...data]);
    setFilteredTickets(prevTickets => [...prevTickets, ...data]);
    textAreaRef.current.value = "";
  };

  const totalTickets = filteredTickets.length;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = tickets.filter(ticket => 
      Object.values(ticket).some(value => 
        value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredTickets(filtered);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ head: [Object.keys(filteredTickets[0] || {})], body: filteredTickets.map(t => Object.values(t)) });
    doc.save("ticket_report.pdf");
  };

  const ticketStatusData = Object.entries(
    filteredTickets.reduce((acc, t) => {
      acc[t.Status] = (acc[t.Status] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const ticketTechData = Object.entries(
    filteredTickets.reduce((acc, t) => {
      acc[t["Assigned Tech Support"]] = (acc[t["Assigned Tech Support"]] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const amPmData = filteredTickets.reduce((acc, t) => {
    if (!t["Date Submitted"]) return acc; // Skip if Date Submitted is missing
  
    const hour = new Date(t["Date Submitted"]).getHours();
    const period = hour < 12 ? "AM" : "PM";
  
    acc[period] = (acc[period] || 0) + 1;
    return acc;
  }, {});
  
  const amPmChartData = Object.entries(amPmData).map(([name, value]) => ({ name, value }));
  

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Ticket Report</Typography>
      <TextField
        inputRef={textAreaRef}
        multiline
        rows={5}
        fullWidth
        label="Paste Ticket Data"
        variant="outlined"
        placeholder="Paste ticket content here..."
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handlePaste} sx={{ mb: 2 }}>Enter</Button>
      <TextField
        fullWidth
        label="Search tickets"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(filteredTickets[0] || {}).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket, index) => (
              <TableRow key={index}>
                {Object.values(ticket).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={exportPDF}>Export PDF</Button>
        <CSVLink data={filteredTickets} filename="ticket_report.csv" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="success">Export CSV</Button>
        </CSVLink>
      </Box>

      {/* Summary */}
      {/* Summary Report */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", mt: 4 }}>
        <Card sx={{ flex: 1, p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">Total Tickets</Typography>
            <Typography variant="h4">{totalTickets}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">Pending Tickets</Typography>
            <Typography variant="h4">{ticketStatusData.find(t => t.name === "Pending")?.value || 0}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">Resolved Tickets</Typography>
            <Typography variant="h4">{ticketStatusData.find(t => t.name === "Resolved")?.value || 0}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">Most Active Tech</Typography>
            <Typography variant="h4">
              {ticketTechData.length > 0 ? ticketTechData.reduce((max, t) => (t.value > max.value ? t : max), ticketTechData[0]).name : "N/A"}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6">Most Common Category</Typography>
            <Typography variant="h4">
              {filteredTickets.length > 0
                ? Object.entries(filteredTickets.reduce((acc, t) => {
                    acc[t.Category] = (acc[t.Category] || 0) + 1;
                    return acc;
                  }, {})).reduce((max, c) => (c[1] > max[1] ? c : max), ["N/A", 0])[0]
                : "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </Box>


      <Card sx={{ p: 2, mb: 3, textAlign: "center", marginTop: 4}}>
        <CardContent>
          <Typography variant="h5">Total Tickets</Typography>
          <Typography variant="h3">{totalTickets}</Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", mt: 4 }}>
      {/* Tickets by Time of Day */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5">Tickets by Time of Day</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={amPmChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`} // SHOW NUMBERS
            >
              {amPmChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#0088FE", "#FFBB28"][index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Ticket Status */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5">Ticket Status</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ticketStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`} // SHOW NUMBERS
            >
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


      <Typography variant="h5" sx={{ mt: 4 }}>Tickets Assigned to Tech</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ticketTechData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#1a74e2" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
