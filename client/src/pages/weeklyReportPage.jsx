import { useState, useRef, useEffect } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { 
   Container, TextField, Button, Typography, Box, Table, TableBody,
   TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from "@mui/material";
import TicketTable from "../components/TicketTable";
import TicketStats from "../components/TicketStats";
import TicketCharts from "../components/TicketCharts";
import PendingTicketsTable from "../components/PendingTicketsTable";
import CategoryChart from "../components/CategoryChart";
import SubCategoryChart from "../components/SubCategoryChart";
import SubSubCategoryChart from "../components/SubSubCategoryChart";

export default function TicketReport() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (submissionStatus) {
      const timer = setTimeout(() => {
        setSubmissionStatus(null);
      }, 1000); // Alert will disappear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  const handlePaste = () => {
    const text = textAreaRef.current.value;
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
    const headers = [
      "Ticket Number", "Date Submitted", 
      "Requestor Email", "Status", 
      "Assigned Tech Support", "Category", 
      "Sub-Category", "Sub-Sub-Category"
    ];
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

    const newTickets = data.filter(newTicket => 
      !tickets.some(existingTicket => existingTicket["Ticket Number"] === newTicket["Ticket Number"])
    );

    if (newTickets.length > 0) {
      setTickets(prevTickets => [...prevTickets, ...newTickets]);
      setFilteredTickets(prevTickets => [...prevTickets, ...newTickets]);
      textAreaRef.current.value = "";
      setSubmissionStatus("success");
    } else if (data.length > 0) {
      setSubmissionStatus("duplicate");
    } else {
      setSubmissionStatus("error");
    }
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

  const handleStatusChange = (index, newStatus) => {
    const updatedTickets = [...filteredTickets];
    updatedTickets[index]["Status"] = newStatus;
    setFilteredTickets(updatedTickets);
    setTickets(tickets.map(ticket => ticket["Ticket Number"] === updatedTickets[index]["Ticket Number"] ? updatedTickets[index] : ticket));
  };

  const handleTechChange = (index, newTech) => {
    const updatedTickets = [...filteredTickets];
    updatedTickets[index]["Assigned Tech Support"] = newTech;
    setFilteredTickets(updatedTickets);
    setTickets(tickets.map(ticket => ticket["Ticket Number"] === updatedTickets[index]["Ticket Number"] ? updatedTickets[index] : ticket));
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
      const cleanName = t['Assigned Tech Support']
        .replace(/@ravago\.com\.ph$/, "")
        .replace(/@smartrigs\.com\.ph$/, "")
        .replace(/\./g, "");
      acc[cleanName] = (acc[cleanName] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const amPmData = filteredTickets.reduce((acc, t) => {
    if (!t["Date Submitted"]) return acc;
    const hour = new Date(t["Date Submitted"]).getHours();
    const period = hour < 12 ? "AM" : "PM";
    acc[period] = (acc[period] || 0) + 1;
    return acc;
  }, {});
  
  const amPmChartData = Object.entries(amPmData).map(([name, value]) => ({ name, value }));

  const handlePrint = () => {
    window.print();
  };

  const pendingTechData = filteredTickets.reduce((acc, ticket) => {
    const tech = ticket["Assigned Tech Support"];
    const day = new Date(ticket["Date Submitted"]).getDay();
    if (!acc[tech]) {
      acc[tech] = {
        tech,
        count: 0,
        totalTickets: 0,
        mondayTickets: 0,
        tuesdayTickets: 0,
        wednesdayTickets: 0,
        thursdayTickets: 0,
        fridayTickets: 0,
      };
    }
    if (ticket.Status === "Open") {
      acc[tech].count += 1;
    }
    acc[tech].totalTickets += 1;
    if (day === 1) acc[tech].mondayTickets += 1;
    if (day === 2) acc[tech].tuesdayTickets += 1;
    if (day === 3) acc[tech].wednesdayTickets += 1;
    if (day === 4) acc[tech].thursdayTickets += 1;
    if (day === 5) acc[tech].fridayTickets += 1;
    return acc;
  }, {});

  const pendingTechDataArray = Object.values(pendingTechData);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const weekdayTickets = daysOfWeek.reduce((acc, day) => {
    acc[day] = filteredTickets.filter(ticket => {
      const ticketDate = new Date(ticket["Date Submitted"]);
      return ticketDate.toLocaleDateString("en-US", { weekday: "long" }) === day;
    }).length;
    return acc;
  }, {});

  const categoryData = Object.entries(
    filteredTickets.reduce((acc, t) => {
      acc[t.Category] = (acc[t.Category] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const subCategoryData = Object.entries(
    filteredTickets.reduce((acc, t) => {
      acc[t["Sub-Category"]] = (acc[t["Sub-Category"]] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const subSubCategoryData = Object.entries(
    filteredTickets.reduce((acc, t) => {
      acc[t["Sub-Sub-Category"]] = (acc[t["Sub-Sub-Category"]] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

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
      <Button variant="contained" color="primary" onClick={handlePaste} sx={{ mb: 2 }}>Submit</Button>
      
      {submissionStatus === "success" && <Alert severity="success">Data submitted successfully!</Alert>}
      {submissionStatus === "duplicate" && <Alert severity="warning">Some tickets have already been submitted!</Alert>}
      {submissionStatus === "error" && <Alert severity="error">Failed to submit data. Please check the format and try again.</Alert>}
      <hr className="text-gray-400" />
      <TextField
        fullWidth
        label="Search tickets"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2, mt: 5 }}
      />
      <TicketTable filteredTickets={filteredTickets} handleStatusChange={handleStatusChange} handleTechChange={handleTechChange} />
      <TicketStats totalTickets={totalTickets} ticketStatusData={ticketStatusData} ticketTechData={ticketTechData} filteredTickets={filteredTickets} />
      <TicketCharts amPmChartData={amPmChartData} ticketStatusData={ticketStatusData} ticketTechData={ticketTechData} />
      
      <PendingTicketsTable totalTickets={totalTickets} weekdayTickets={weekdayTickets} pendingTechData={pendingTechDataArray} />
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={exportPDF}>Export PDF</Button>
        <CSVLink data={filteredTickets} filename="ticket_report.csv" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="success">Export CSV</Button>
        </CSVLink>
        <Button variant="contained" color="primary" onClick={handlePrint}>Download</Button>
      </Box>
      
      {/* Chart of Category */}
      <Box sx={{ 
          mt: 5, 
          display: "flex-col", 
          gap: 4, 
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}>
          <Box sx={{ flex: 1, minWidth: 300 }}> 
            <CategoryChart data={categoryData} />
          </Box>
          
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <SubCategoryChart data={subCategoryData} />
          </Box>
          
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <SubSubCategoryChart data={subSubCategoryData} />
          </Box>
        </Box>

      {/* <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>Category Analysis</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Count</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>Sub-Category Analysis</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Sub-Category</strong></TableCell>
                <TableCell><strong>Count</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategoryData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>Sub-Sub-Category Analysis</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Sub-Sub-Category</strong></TableCell>
                <TableCell><strong>Count</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subSubCategoryData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
    </Container>
  );
}