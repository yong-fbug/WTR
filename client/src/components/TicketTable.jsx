import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";

const TicketTable = ({ filteredTickets, handleStatusChange }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Ticket Number</strong></TableCell>
            <TableCell><strong>Date Submitted</strong></TableCell>
            <TableCell><strong>Requestor Email</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Assigned Tech Support</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Sub-Category</strong></TableCell>
            <TableCell><strong>Sub-Sub-Category</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTickets.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell>{ticket["Ticket Number"]}</TableCell>
              <TableCell>{ticket["Date Submitted"]}</TableCell>
              <TableCell>{ticket["Requestor Email"]}</TableCell>
              <TableCell>
                <Select
                  value={ticket["Status"]}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{ticket["Assigned Tech Support"]}</TableCell>
              <TableCell>{ticket["Category"]}</TableCell>
              <TableCell>{ticket["Sub-Category"]}</TableCell>
              <TableCell>{ticket["Sub-Sub-Category"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable;