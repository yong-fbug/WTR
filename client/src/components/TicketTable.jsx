import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  MenuItem,
  Select,
  IconButton,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteAllButton from "./DeleteAllButton";
import DeleteById from "./DeleteById";

const TicketTable = ({ filteredTickets, handleStatusChange, handleTechChange, clearStorage, deleteTicketById }) => {
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const uniqueTechs = [...new Set(filteredTickets.map(ticket => ticket["Assigned Tech Support"]))];

  const handleOpen = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  const handleChange = (e) => {
    setSelectedTicket({ ...selectedTicket, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    handleStatusChange(selectedTicket.index, selectedTicket["Status"]);
    handleTechChange(selectedTicket.index, selectedTicket["Assigned Tech Support"]);
    handleClose();
  };
  

  return (
    <div className="mb-250">
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto'}}>
        <Table>
          <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1}}>
            <TableRow>
              <TableCell><strong>Ticket Number</strong></TableCell>
              <TableCell><strong>Date Submitted</strong></TableCell>
              <TableCell><strong>Requestor Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Assigned Tech Support</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Sub-Category</strong></TableCell>
              <TableCell sx={{ width: 180 }}><strong>Sub-Sub-Category</strong></TableCell>
              <TableCell><strong>Edit</strong></TableCell>
              <TableCell><strong><DeleteAllButton clearStorage={clearStorage} />
              </strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket, index) => (
              <TableRow key={index}>
                <TableCell>{ticket["Ticket Number"]}</TableCell>
                <TableCell>{ticket["Date Submitted"]}</TableCell>
                <TableCell>{ticket["Requestor Email"]}</TableCell>
                <TableCell>{ticket["Status"]}</TableCell>
                <TableCell>{ticket["Assigned Tech Support"]}</TableCell>
                <TableCell>{ticket["Category"]}</TableCell>
                <TableCell>{ticket["Sub-Category"]}</TableCell>
                <TableCell>{ticket["Sub-Sub-Category"]}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleOpen({ ...ticket, index })}>
                    Edit
                  </Button>
                  
                </TableCell>

                <TableCell>
                <DeleteById
                  ticketNumber={ticket["Ticket Number"]}
                  deleteTicketById={deleteTicketById}
                  className="bg-red-500 text-white px-2 py-1 rounded border-"
                >
                  Delete
                </DeleteById>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Editing Ticket */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Edit Ticket</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedTicket && (
            <>
              <Select
                fullWidth
                name="Status"
                value={selectedTicket.Status}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
              <Select
                fullWidth
                name="Assigned Tech Support"
                value={selectedTicket["Assigned Tech Support"]}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                {uniqueTechs.map((tech, i) => (
                  <MenuItem key={i} value={tech}>{tech}</MenuItem>
                ))}
              </Select>
              <Button variant="contained" onClick={handleSave} fullWidth>
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TicketTable;