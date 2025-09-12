import { Box } from "@mui/material";

export default function Header({ className }) {
  return (
    <Box
      className={className}
      component={"div"}
      sx={{
        backgroundColor: "white",
        boxShadow: "5px 5px 15px rgba(219, 219, 219, 0.42)",
        position: "relative",
        zIndex: 1,
      }}
    ></Box>
  );
}
