import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Box } from "@mui/material";
import "./Layout.css";
export default function Layout({ children }) {
  return (
    <Box className="layout-wrapper">
      <Header className="header" />
      <Sidebar className="sidebar" />
      <Box component={"div"} className="content-wrapper">
        {children}
      </Box>
    </Box>
  );
}
