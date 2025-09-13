import { Box, Typography, Paper } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";

export default function Analytics() {
  const jobAppliedData = [
    { month: "Jan", value: 5 },
    { month: "Feb", value: 8 },
    { month: "Mar", value: 12 },
    { month: "Apr", value: 7 },
    { month: "May", value: 10 },
    { month: "Jun", value: 6 },
    { month: "Jul", value: 9 },
    { month: "Aug", value: 14 },
    { month: "Sep", value: 11 },
    { month: "Oct", value: 13 },
    { month: "Nov", value: 7 },
    { month: "Dec", value: 15 },
  ];
  const applicationStatus = [
    {
      label: "Applied",
      value: 20,
    },
    {
      label: "Interview",
      value: 10,
    },
    {
      label: "Offer",
      value: 3,
    },
    {
      label: "Rejected",
      value: 12,
    },
  ];
  return (
    <Box component={"section"} sx={{ m: 2 }}>
      <Box component={"div"}>
        <Typography variant={"h1"} sx={{ fontSize: 20, fontWeight: 500 }}>
          Analytics
        </Typography>
        <Typography variant={"body1"} sx={{ fontSize: 14, fontWeight: 300 }}>
          Insights of your jobs applied and interviews
        </Typography>
      </Box>
      <Box
        component={"div"}
        sx={{ display: "flex", gap: 2, justifyContent: "flex-start", mt: 2 }}
      >
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
            Total Applications
          </Typography>
          <Typography variant={"body1"} sx={{ fontWeight: 600 }}>
            5
          </Typography>
        </Paper>
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
            Total Interviews
          </Typography>
          <Typography variant={"body1"} sx={{ fontWeight: 600 }}>
            5
          </Typography>
        </Paper>
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
            Offers
          </Typography>
          <Typography variant={"body1"} sx={{ fontWeight: 600 }}>
            5
          </Typography>
        </Paper>
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
            Rejections
          </Typography>
          <Typography variant={"body1"} sx={{ fontWeight: 600 }}>
            5
          </Typography>
        </Paper>
      </Box>
      <Box
        component={"div"}
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: "1fr 0.5fr",
          gap: 2,
        }}
      >
        <Box component={Paper} sx={{ p: 2 }}>
          <Typography
            variant={"h2"}
            sx={{ fontSize: 18, fontWeight: 500, mb: 2 }}
          >
            Jobs Applied Overview
          </Typography>
          <Box component={"div"}>
            <BarChart
              series={[{ data: jobAppliedData.map((item) => item.value) }]}
              xAxis={[
                {
                  scaleType: "band",
                  data: jobAppliedData.map((item) => item.month),
                },
              ]}
              height={300}
            />
          </Box>
        </Box>
        <Box component={Paper} sx={{ p: 2 }}>
          <Typography
            variant={"h2"}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              mb: 2,
            }}
          >
            Application Responses
          </Typography>
          <Box component={"div"}>
            <PieChart
              sx={{ display: "flex", flexDirection: "column-reverse" }}
              height={300}
              slotProps={{
                legend: {
                  direction: "horizontal",
                },
              }}
              series={[
                {
                  data: applicationStatus.map((item) => ({
                    value: item.value,
                    label: item.label,
                  })),
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
