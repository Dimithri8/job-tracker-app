import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import { Box } from "@mui/material";
import "./Layout.css";

export default function Layout() {
  return (
    <Box className="layout-wrapper">
      <Sidebar className="sidebar" />
      <Box className="main-content">
        <Header className="header" />
        <Box
          component={"div"}
          sx={{ backgroundColor: "#F8F8F8" }}
          className="content-wrapper"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
