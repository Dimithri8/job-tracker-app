import { Box, Typography } from "@mui/material";

export default function Header({ className }) {
  return (
    <Box
      className={className}
      component={"div"}
      sx={{ backgroundColor: "pink" }}
    >
      <Typography>Header</Typography>
    </Box>
  );
}
