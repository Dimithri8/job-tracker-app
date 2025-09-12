import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import "./Sidebar.css";

export default function Sidebar({ className }) {
  return (
    <Box
      className={className}
      component={"div"}
      sx={{
        backgroundColor: "#2C3E50",
        padding: 3,
        boxShadow: 5,
        color: "white",
      }}
    >
      <Typography variant={"h1"} sx={{ fontSize: 20, fontWeight: 600, mb: 5 }}>
        Job Tracker
      </Typography>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          style={{
            textDecoration: "none",
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
          to={"/"}
        >
          <SpaceDashboardOutlinedIcon sx={{ color: "white" }} />
          <Typography
            sx={{
              color: "white",
            }}
          >
            Dashboard
          </Typography>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          style={{
            textDecoration: "none",
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
          to={"/jobs"}
        >
          <WorkOutlineOutlinedIcon sx={{ color: "white" }} />
          <Typography
            sx={{
              color: "white",
            }}
          >
            Jobs
          </Typography>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          style={{
            textDecoration: "none",
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
          to={"/interviews"}
        >
          <GroupsOutlinedIcon sx={{ color: "white" }} />
          <Typography
            sx={{
              color: "white",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Interviews
          </Typography>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          style={{
            textDecoration: "none",
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
          to={"/analytics"}
        >
          <LeaderboardOutlinedIcon sx={{ color: "white" }} />
          <Typography
            sx={{
              color: "white",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Analytics
          </Typography>
        </NavLink>
      </Box>
    </Box>
  );
}
