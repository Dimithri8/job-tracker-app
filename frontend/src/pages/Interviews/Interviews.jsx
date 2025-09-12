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
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Interviews() {
  const status = ["Scheduled", "Cancelled", "Completed"];
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [interview, setInterview] = useState({
    company: "",
    title: "",
    date: "",
    time: "",
    type: "",
    status: "",
  });
  const [allInterviews, setAllInterviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const paginatedInterviews = allInterviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
  function handleDelete(id) {
    setAllInterviews((prevValues) =>
      prevValues.filter((item, index) => index !== id)
    );
  }
  function handleEdit(item) {
    setIsEditing(true);
    setIsOpen(true);
    setInterview(item);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setInterview((prevValue) => ({ ...prevValue, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      setAllInterviews((prevValues) =>
        prevValues.map((item) =>
          item.title === interview.title ? { ...interview } : item
        )
      );
    } else {
      setAllInterviews((prevInterviews) => [...prevInterviews, interview]);
    }
    setInterview({
      company: "",
      title: "",
      date: "",
      time: "",
      type: "",
      status: "",
    });
    setIsOpen(false);
  }
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
        <Box>
          <Typography variant={"h1"} sx={{ fontSize: 20, fontWeight: 500 }}>
            Manage Interviews
          </Typography>
          <Typography variant={"body1"} sx={{ fontSize: 14, fontWeight: 300 }}>
            You have {allInterviews.length} job interviews
          </Typography>
        </Box>
        <Button
          onClick={handleOpenForm}
          startIcon={<AddIcon />}
          type={"button"}
          variant={"contained"}
        >
          Add Interview
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInterviews.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.status}</TableCell>
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
            count={allInterviews.length}
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
          {isEditing ? "Edit Interview" : "Add Interview"}
        </DialogTitle>
        <DialogContent>
          <Box
            onSubmit={handleSubmit}
            component={"form"}
            id="interview-form"
            sx={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
            }}
          >
            <TextField
              name="company"
              value={interview.company}
              label="Company"
              type={"text"}
              onChange={handleChange}
            />
            <TextField
              name="title"
              value={interview.title}
              label="Job Title"
              type={"text"}
              onChange={handleChange}
            />
            <TextField
              name="date"
              value={interview.date}
              label="Date"
              type={"date"}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={handleChange}
            />
            <TextField
              name="time"
              value={interview.time}
              type={"time"}
              label={"Time"}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={handleChange}
            />
            <FormControl>
              <FormLabel id="interview-type-label">Interview Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="interview-type-label"
                name="type"
                value={interview.type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={"Virtual"}
                  control={<Radio />}
                  label={"Virtual"}
                />
                <FormControlLabel
                  value={"In-Person"}
                  control={<Radio />}
                  label={"In-Person"}
                />
              </RadioGroup>
            </FormControl>
            <FormControl id="status-label">Status</FormControl>
            <Select
              name="status"
              value={interview.status}
              onChange={handleChange}
              labelId="status-label"
              label="Status"
              variant={"outlined"}
              defaultValue={"Scheduled"}
            >
              {status.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type={"button"}
            variant={"outlined"}
            onClick={handleCloseForm}
          >
            Cancel
          </Button>
          <Button form="interview-form" variant={"contained"} type={"submit"}>
            {isEditing ? "Save Changes" : "Add Interview"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
