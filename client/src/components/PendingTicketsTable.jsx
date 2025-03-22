import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const PendingTicketsTable = ({ totalTickets, weekdayTickets, pendingTechData = [] }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto"}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Tech</strong></TableCell>
            <TableCell><strong>Pending</strong></TableCell>
            <TableCell><strong>Total Tickets</strong></TableCell>
            <TableCell><strong>Monday</strong></TableCell>
            <TableCell><strong>Tuesday</strong></TableCell>
            <TableCell><strong>Wednesday</strong></TableCell>
            <TableCell><strong>Thursday</strong></TableCell>
            <TableCell><strong>Friday</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingTechData.length > 0 ? (
            pendingTechData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.tech}</TableCell>
                <TableCell>{entry.count}</TableCell>
                <TableCell>{entry.totalTickets}</TableCell>
                <TableCell>{entry.mondayTickets}</TableCell>
                <TableCell>{entry.tuesdayTickets}</TableCell>
                <TableCell>{entry.wednesdayTickets}</TableCell>
                <TableCell>{entry.thursdayTickets}</TableCell>
                <TableCell>{entry.fridayTickets}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No Tickets
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingTicketsTable;