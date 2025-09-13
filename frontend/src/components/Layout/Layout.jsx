import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Jobs from "../../pages/Jobs/Jobs";
import Interviews from "../../pages/Interviews/Interviews";
import Analytics from "../../pages/Analytics/Analytics";

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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
