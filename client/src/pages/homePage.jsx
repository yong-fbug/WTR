// import React from "react";
// import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
// import TodayIcon from "@mui/icons-material/Today";
// import EventNoteIcon from "@mui/icons-material/EventNote";

// const Homepage = () => {
//   return (
//     <Box sx={{ display: "flex", height: "100vh"}}>
//       {/* Sidebar */}
//       <Box sx={{ width: 250, color: "black", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 2, boxShadow: 5 }}>
//         <Box>
//           <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>Menu</Typography>

//           <List>
//             <ListItem button component="a" href="/WeeklyReportPage">
//               <EventNoteIcon sx={{ marginRight: 1 }} />
//               <ListItemText primary="Weekly Ticket Report" />
//             </ListItem>

//             <ListItem button component="a" href="/DailyReportPage">
//               <TodayIcon sx={{ marginRight: 1 }} />
//               <ListItemText primary="Daily Ticket Report" />
//             </ListItem>
//           </List>
//         </Box>

//         {/* User Section */}
//         <Box>
//           <Divider sx={{ bgcolor: "white" }} />
//           <List>
//             <ListItem>
//               <ListItemText primary="User Account" />
//             </ListItem>
//             <ListItem>
//               <Button variant="contained" color="secondary" fullWidth>Logout</Button>
//             </ListItem>
//           </List>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       {/* <Box sx={{ flexGrow: 1, padding: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Dashboard Overview
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Total Tickets</Typography>
//                 <Typography variant="h4">150</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Open Tickets</Typography>
//                 <Typography variant="h4" color="error">45</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Closed Tickets</Typography>
//                 <Typography variant="h4" color="success.main">105</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box> */}
//     </Box>
//   );
// };

// export default Homepage;
