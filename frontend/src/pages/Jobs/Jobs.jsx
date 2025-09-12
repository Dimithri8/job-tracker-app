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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function Jobs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [job, setJob] = useState({
    title: "",
    company: "",
    appliedDate: "",
    status: "",
    location: "",
    notes: "",
  });
  const [jobsApplied, setJobsApplied] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const status = ["Applied", "Interview", "Offer", "Reject"];

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  function handleOpenForm() {
    setIsEditing(false);
    setIsOpen(true);
  }
  function handleCloseForm() {
    setIsOpen(false);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setJob((prevValue) => ({ ...prevValue, [name]: value }));
    console.log(job);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      setJobsApplied((prevJobs) =>
        prevJobs.map((item) => (item.title === job.title ? { ...job } : item))
      );
    } else {
      setJobsApplied((prevJobs) => [...prevJobs, job]);
    }

    setJob({
      title: "",
      company: "",
      appliedDate: "",
      status: "",
      location: "",
      notes: "",
    });
    setIsOpen(false);
  }
  function handleDelete(index) {
    setJobsApplied((prevJobs) => prevJobs.filter((item, id) => id !== index));
  }
  function handleEdit(item) {
    setIsEditing(true);
    setIsOpen(true);
    setJob(item);
  }
  const paginatedJobs = jobsApplied.slice(
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
            You have applied to {jobsApplied.length} jobs
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant={"contained"}
          type={"button"}
          onClick={handleOpenForm}
        >
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
                  <Button
                    variant={"outlined"}
                    type={"button"}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(index)}
                    variant={"outlined"}
                    type={"button"}
                    color={"error"}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            component={"div"}
            count={jobsApplied.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10]}
          />
        </Table>
      </TableContainer>
      <Dialog open={isOpen}>
        <DialogTitle>
          {isEditing ? "Edit Applied Job" : "Add New Job"}
        </DialogTitle>
        <DialogContent>
          <Box
            id="job-form"
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
            }}
          >
            <TextField
              label="Job Title"
              name="title"
              variant={"outlined"}
              type={"text"}
              value={job.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="company"
              label="Company"
              variant={"outlined"}
              type={"text"}
              value={job.company}
              onChange={handleChange}
            />
            <TextField
              name="appliedDate"
              label="Applied Date"
              variant={"outlined"}
              slotProps={{ inputLabel: { shrink: true } }}
              type={"date"}
              value={job.appliedDate}
              onChange={handleChange}
            />
            <FormControl>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                name="status"
                labelId="status-label"
                label="Status"
                variant={"outlined"}
                defaultValue={"Applied"}
                value={job.status}
                onChange={handleChange}
              >
                {status.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="location"
              label="Location"
              variant={"outlined"}
              type={"text"}
              value={job.location}
              onChange={handleChange}
            />
            <TextField
              name="notes"
              multiline
              rows={4}
              label="Notes"
              variant={"outlined"}
              type={"text"}
              value={job.notes}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseForm}
            variant={"outlined"}
            type={"button"}
          >
            Cancel
          </Button>
          <Button form="job-form" variant={"contained"} type={"submit"}>
            {isEditing ? "Save Changes" : "Add Job"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
