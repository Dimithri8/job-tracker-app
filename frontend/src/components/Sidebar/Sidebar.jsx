import { Box, Typography } from "@mui/material";

export default function Sidebar({ className }) {
  return (
    <Box
      className={className}
      component={"div"}
      sx={{ backgroundColor: "purple" }}
    >
      <Typography>Sidebar</Typography>
    </Box>
  );
}
