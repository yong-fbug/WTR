import React, { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TicketReport() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const textAreaRef = useRef(null);

  const handlePaste = () => {
    const text = textAreaRef.current.value;
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
    const headers = ["Ticket Number", "Date Submitted", "Requestor Email", "Status", "Subject", "Assigned Tech Support", "Category", "Sub-Category", "Sub-Sub-Category"];
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
    textAreaRef.current.value = ""; // Clear the input box
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

  const categoryData = filteredTickets.reduce((acc, t) => {
    acc[t.Category] = (acc[t.Category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([key, value]) => ({ name: key, count: value }));

  // Calculate total tickets every day
  const ticketsByDay = filteredTickets.reduce((acc, t) => {
    const date = new Date(t["Date Submitted"]).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const ticketsByDayData = Object.entries(ticketsByDay).map(([key, value]) => ({ date: key, count: value }));

  // Calculate total tickets in that week
  const ticketsByWeek = filteredTickets.reduce((acc, t) => {
    const week = new Date(t["Date Submitted"]).toLocaleDateString('en-US', { week: 'numeric', year: 'numeric' });
    acc[week] = (acc[week] || 0) + 1;
    return acc;
  }, {});

  const ticketsByWeekData = Object.entries(ticketsByWeek).map(([key, value]) => ({ week: key, count: value }));

  // Find the most ticket day (AM or PM)
  const ticketsByTimeOfDay = filteredTickets.reduce((acc, t) => {
    const hours = new Date(t["Date Submitted"]).getHours();
    const period = hours < 12 ? 'AM' : 'PM';
    acc[period] = (acc[period] || 0) + 1;
    return acc;
  }, {});

  const mostTicketsTimeOfDay = Object.entries(ticketsByTimeOfDay).reduce((max, entry) => entry[1] > max[1] ? entry : max, ['', 0]);

  // Find the most frequent requestor email
  const requestorEmails = filteredTickets.reduce((acc, t) => {
    acc[t["Requestor Email"]] = (acc[t["Requestor Email"]] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentRequestorEmail = Object.entries(requestorEmails).reduce((max, entry) => entry[1] > max[1] ? entry : max, ['', 0]);

  // Count the status (open or closed)
  const statusCount = filteredTickets.reduce((acc, t) => {
    acc[t.Status] = (acc[t.Status] || 0) + 1;
    return acc;
  }, {});

  // Count the number of tickets assigned to each tech support and their pending tickets
  const techSupportTickets = filteredTickets.reduce((acc, t) => {
    const tech = t["Assigned Tech Support"];
    acc[tech] = acc[tech] || { total: 0, pending: 0 };
    acc[tech].total += 1;
    if (t.Status === 'Open') {
      acc[tech].pending += 1;
    }
    return acc;
  }, {});

  const techSupportData = Object.entries(techSupportTickets).map(([key, value]) => ({ tech: key, total: value.total, pending: value.pending }));

  // Find the most and least frequent categories, sub-categories, and sub-sub-categories
  const categoryCount = filteredTickets.reduce((acc, t) => {
    acc[t.Category] = (acc[t.Category] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentCategory = Object.entries(categoryCount).reduce((max, entry) => entry[1] > max[1] ? entry : max, ['', 0]);
  const leastFrequentCategory = Object.entries(categoryCount).reduce((min, entry) => entry[1] < min[1] ? entry : min, ['', Infinity]);

  const subCategoryCount = filteredTickets.reduce((acc, t) => {
    acc[t["Sub-Category"]] = (acc[t["Sub-Category"]] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentSubCategory = Object.entries(subCategoryCount).reduce((max, entry) => entry[1] > max[1] ? entry : max, ['', 0]);
  const leastFrequentSubCategory = Object.entries(subCategoryCount).reduce((min, entry) => entry[1] < min[1] ? entry : min, ['', Infinity]);

  const subSubCategoryCount = filteredTickets.reduce((acc, t) => {
    acc[t["Sub-Sub-Category"]] = (acc[t["Sub-Sub-Category"]] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentSubSubCategory = Object.entries(subSubCategoryCount).reduce((max, entry) => entry[1] > max[1] ? entry : max, ['', 0]);
  const leastFrequentSubSubCategory = Object.entries(subSubCategoryCount).reduce((min, entry) => entry[1] < min[1] ? entry : min, ['', Infinity]);

  return (
    <div>
      <h2>Paste Ticket Data</h2>
      <textarea ref={textAreaRef} rows="10" cols="100" placeholder="Paste ticket content here..." />
      <button onClick={handlePaste}>Enter</button>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search tickets..." />
      <table border="1">
        <thead>
          <tr>{Object.keys(filteredTickets[0] || {}).map((key) => <th key={key}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket, index) => (
            <tr key={index}>{Object.values(ticket).map((value, i) => <td key={i}>{value}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportPDF}>Export PDF</button>
      <CSVLink data={filteredTickets} filename="ticket_report.csv">
        <button>Export CSV</button>
      </CSVLink>
      <h3>Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#1a74e2" />
        </BarChart>
      </ResponsiveContainer>
      <h3>Tickets by Day</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ticketsByDayData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#1a74e2" />
        </BarChart>
      </ResponsiveContainer>
      <h3>Tickets by Week</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ticketsByWeekData}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#1a74e2" />
        </BarChart>
      </ResponsiveContainer>
      <h3>Summary Report</h3>
      <p>Most Tickets Time of Day: {mostTicketsTimeOfDay[0]} ({mostTicketsTimeOfDay[1]} tickets)</p>
      <p>Most Frequent Requestor Email: {mostFrequentRequestorEmail[0]} ({mostFrequentRequestorEmail[1]} tickets)</p>
      <p>Status Count: Open ({statusCount.Open || 0}), Closed ({statusCount.Closed || 0})</p>
      <h3>Tech Support Tickets</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Tech Support</th>
            <th>Total Tickets</th>
            <th>Pending Tickets</th>
          </tr>
        </thead>
        <tbody>
          {techSupportData.map((tech, index) => (
            <tr key={index}>
              <td>{tech.tech}</td>
              <td>{tech.total}</td>import React from "react";
              <td>{tech.pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Category Statistics</h3>
      <p>Most Frequent Category: {mostFrequentCategory[0]} ({mostFrequentCategory[1]} tickets)</p>
      <p>Least Frequent Category: {leastFrequentCategory[0]} ({leastFrequentCategory[1]} tickets)</p>
      <p>Most Frequent Sub-Category: {mostFrequentSubCategory[0]} ({mostFrequentSubCategory[1]} tickets)</p>
      <p>Least Frequent Sub-Category: {leastFrequentSubCategory[0]} ({leastFrequentSubCategory[1]} tickets)</p>
      <p>Most Frequent Sub-Sub-Category: {mostFrequentSubSubCategory[0]} ({mostFrequentSubSubCategory[1]} tickets)</p>
      <p>Least Frequent Sub-Sub-Category: {leastFrequentSubSubCategory[0]} ({leastFrequentSubSubCategory[1]} tickets)</p>
    </div>
  );
}