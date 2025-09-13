import { Paper, Typography } from "@mui/material";
export default function MetricCard({ label, value }) {
  return (
    <Paper
      sx={{
        width: 200,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant={"h3"} sx={{ fontSize: 16 }}>
        {label}
      </Typography>
      <Typography variant={"body1"} sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Paper>
  );
}
