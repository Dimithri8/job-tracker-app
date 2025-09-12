import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
  Button,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function Jobs() {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      appliedDate: "2025-09-10",
      status: "Applied",
      location: "Mountain View, CA",
      notes: "Follow up in 1 week.",
    },
    {
      title: "Backend Developer",
      company: "Amazon",
      appliedDate: "2025-09-08",
      status: "Interview Scheduled",
      location: "Seattle, WA",
      notes: "Interview on 2025-09-15 at 10:00 AM.",
    },
    {
      title: "UI/UX Designer",
      company: "Facebook",
      appliedDate: "2025-09-05",
      status: "Rejected",
      location: "Remote",
      notes: "Received rejection email on 2025-09-12.",
    },
    {
      title: "Full Stack Developer",
      company: "Microsoft",
      appliedDate: "2025-09-09",
      status: "Offer",
      location: "Redmond, WA",
      notes: "Accepted offer, starting 2025-10-01.",
    },
    {
      title: "Data Analyst",
      company: "Netflix",
      appliedDate: "2025-09-07",
      status: "Applied",
      location: "Los Gatos, CA",
      notes: "Waiting for response.",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const paginatedJobs = jobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <Box component={"section"} sx={{ m: 2 }}>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component={"div"}>
          <Typography variant="h1" sx={{ fontSize: 20, fontWeight: 500 }}>
            Manage Jobs Applied
          </Typography>
          <Typography variant={"body1"} sx={{ fontSize: 14, fontWeight: 300 }}>
            You have applied to {jobs.length} jobs
          </Typography>
        </Box>
        <Button startIcon={<AddIcon />} variant={"contained"} type={"button"}>
          Add New Job
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJobs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.appliedDate}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell sx={{ display: "flex", gap: 1 }}>
                  <Button variant={"outlined"} type={"button"}>
                    Edit
                  </Button>
                  <Button variant={"outlined"} type={"button"} color={"error"}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            component={"div"}
            count={jobs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10]}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
