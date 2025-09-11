import { Box, Typography } from "@mui/material";

export default function Header({ className }) {
  return (
    <Box
      className={className}
      component={"div"}
      sx={{ backgroundColor: "#eeececff" }}
    ></Box>
  );
}
