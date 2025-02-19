import React, { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Container, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Card, CardContent, Grid
} from "@mui/material";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

export default function TicketReport() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const textAreaRef = useRef(null);

  const handlePaste = () => {
    const text = textAreaRef.current.value;
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
    const headers = ["Ticket Number", "Date Submitted", "Requestor Email", "Status", "Assigned Tech Support", "Category", "Sub-Category", "Sub-Sub-Category"];
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

  const totalTickets = filteredTickets.length;
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

  const categoryData = Object.entries(
    filteredTickets.reduce((acc, t) => {
      acc[t.Category] = (acc[t.Category] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const amPmData = Object.entries(
    filteredTickets.reduce((acc, t) => {
      const hours = new Date(t["Date Submitted"]).getHours();
      const period = hours < 12 ? "AM" : "PM";
      acc[period] = (acc[period] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Ticket Report Dashboard</Typography>
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
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handlePaste}>Enter</Button>
        <Button variant="contained" color="secondary" onClick={exportPDF}>Export PDF</Button>
        <CSVLink data={filteredTickets} filename="ticket_report.csv" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="success">Export CSV</Button>
        </CSVLink>
      </Box>
      <TextField
        fullWidth
        label="Search tickets"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h5">Total Tickets</Typography>
              <Typography variant="h3">{totalTickets}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h5">Tickets by Time of Day</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={amPmData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {amPmData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
