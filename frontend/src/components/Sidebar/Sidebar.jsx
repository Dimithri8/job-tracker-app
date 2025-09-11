import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Sidebar({ className }) {
  return (
    <Box
      className={className}
      component={"div"}
      sx={{ backgroundColor: "white" }}
    >
      <Typography
        variant={"h1"}
        sx={{ fontSize: 20, fontWeight: 600, padding: 2 }}
      >
        Job Tracker
      </Typography>
      <Box component={"div"}>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={"/jobs"}>Jobs</NavLink>
            </li>
            <li>
              <NavLink to={"/interviews"}>Interviews</NavLink>
            </li>
            <li>
              <NavLink to={"/analytics"}>Analytics</NavLink>
            </li>
          </ul>
        </nav>
      </Box>
    </Box>
  );
}
