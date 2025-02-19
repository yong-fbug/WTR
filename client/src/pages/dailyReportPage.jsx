import React, { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function TicketReport() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const textAreaRef = useRef(null);

  const handlePaste = () => {
    const text = textAreaRef.current.value;
    const lines = text.split("\n").map((line) => line.trim()).filter((line) => line);
    const headers = ["Ticket Number", "Date Submitted", "Requestor Email", "Status", "Subject", "Assigned Tech Support", "Category", "Sub-Category", "Sub-Sub-Category"];
    const data = [];
    
    let ticket = {};
    let currentHeader = null;

    lines.forEach((line) => {
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

    setTickets((prevTickets) => [...prevTickets, ...data]);
    setFilteredTickets((prevTickets) => [...prevTickets, ...data]);
    textAreaRef.current.value = "";
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = tickets.filter((ticket) =>
      Object.values(ticket).some((value) =>
        value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredTickets(filtered);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ head: [Object.keys(filteredTickets[0] || {})], body: filteredTickets.map((t) => Object.values(t)) });
    doc.save("ticket_report.pdf");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ticket Report
      </Typography>

      {/* Paste Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6">Paste Ticket Data</Typography>
        <TextField
          inputRef={textAreaRef}
          multiline
          rows={4}
          fullWidth
          placeholder="Paste ticket content here..."
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handlePaste}>
          Enter
        </Button>
      </Box>

      {/* Search Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search tickets..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 3 }}
      />

      {/* Ticket Table */}
      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(filteredTickets[0] || {}).map((key) => (
                <TableCell key={key} sx={{ fontWeight: "bold" }}>
                  {key}
                </TableCell>
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

      {/* Export Buttons */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <Button variant="contained" color="secondary" onClick={exportPDF}>
          Export PDF
        </Button>
        <CSVLink data={filteredTickets} filename="ticket_report.csv" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="success">Export CSV</Button>
        </CSVLink>
      </Box>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Category Breakdown Chart */}
      <Typography variant="h6">Category Breakdown</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredTickets.map((t) => ({ name: t.Category, count: 1 }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#1a74e2" />
        </BarChart>
      </ResponsiveContainer>

      <Divider sx={{ marginBottom: 3, marginTop: 3 }} />

      {/* Summary Report */}
      <Typography variant="h6">Summary Report</Typography>
      <Typography>Most Tickets Time of Day: N/A</Typography>
      <Typography>Most Frequent Requestor Email: N/A</Typography>

      {/* Tech Support Tickets Table */}
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Tech Support Tickets
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Tech Support</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Tickets</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Pending Tickets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Example Tech</TableCell>
              <TableCell>5</TableCell>
              <TableCell>2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
