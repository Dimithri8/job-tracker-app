import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";
import MetricCard from "../../components/MetricCard/MetricCard";

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    rejectedJobCount: 0,
    offersJobCount: 0,
    interviewJobCount: 0,
    appliedJobCount: 0,
    totalJobsApplied: 0,
    totalInterviews: 0,
    applicationsByMonth: [],
  });

  const applicationStatus = [
    {
      label: "Applied",
      value: analytics.totalJobsApplied,
    },
    {
      label: "Interview",
      value: analytics.totalInterviews,
    },
    {
      label: "Offer",
      value: analytics.offersJobCount,
    },
    {
      label: "Rejected",
      value: analytics.rejectedJobCount,
    },
  ];
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function getAnalytics() {
      const response = await fetch(`http://localhost:5000/analytics`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAnalytics(data);
      } else {
        console.error(data.error);
      }
    }
    getAnalytics();
  }, []);

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
        <MetricCard
          label={"Total Applications"}
          value={analytics.totalJobsApplied}
        />
        <MetricCard
          label={"Total Interviews"}
          value={analytics.totalInterviews}
        />
        <MetricCard label={"Offers"} value={analytics.offersJobCount} />
        <MetricCard label={"Rejections"} value={analytics.rejectedJobCount} />
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
            {analytics.applicationsByMonth.length > 0 && (
              <BarChart
                series={[
                  {
                    data: analytics.applicationsByMonth.map(
                      (item) => item.count
                    ),
                  },
                ]}
                xAxis={[
                  {
                    scaleType: "band",
                    data: analytics.applicationsByMonth.map(
                      (item) => item.month
                    ),
                  },
                ]}
                yAxis={[
                  {
                    min: 0,
                    max: 5,
                  },
                ]}
                height={300}
              />
            )}
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
              height={250}
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
