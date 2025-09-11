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
      sx={{ backgroundColor: "white", padding: 3, boxShadow: 5 }}
    >
      <Typography variant={"h1"} sx={{ fontSize: 20, fontWeight: 600, mb: 5 }}>
        Job Tracker
      </Typography>
      <Box component={"div"}>
        <nav>
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <li className="nav-link">
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
                to={"/"}
              >
                <SpaceDashboardOutlinedIcon sx={{ color: "black" }} />
                <Typography
                  sx={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Dashboard
                </Typography>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
                to={"/jobs"}
              >
                <WorkOutlineOutlinedIcon sx={{ color: "black" }} />
                <Typography
                  sx={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Jobs
                </Typography>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
                to={"/interviews"}
              >
                <GroupsOutlinedIcon sx={{ color: "black" }} />
                <Typography
                  sx={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Interviews
                </Typography>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
                to={"/analytics"}
              >
                <LeaderboardOutlinedIcon sx={{ color: "black" }} />
                <Typography
                  sx={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Analytics
                </Typography>
              </NavLink>
            </li>
          </ul>
        </nav>
      </Box>
    </Box>
  );
}
