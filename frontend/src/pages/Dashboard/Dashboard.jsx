import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Todo from "../../components/Todo/Todo";
import MetricCard from "../../components/MetricCard/MetricCard";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [todo, setTodo] = useState({ text: "", isChecked: false });
  const [allTodos, setAllTodos] = useState([]);
  const [analytics, setAnalytics] = useState({
    rejectedJobCount: 0,
    offersJobCount: 0,
    interviewJobCount: 0,
    appliedJobCount: 0,
    totalJobsApplied: 0,
    totalInterviews: 0,
    applicationsByMonth: [],
  });
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

  function handleChange(event) {
    setTodo((prevValues) => ({ ...prevValues, text: event.target.value }));
  }
  function handleAddTodo(e) {
    e.preventDefault();
    setAllTodos((prevItems) => [
      ...prevItems,
      { text: todo.text, isChecked: false },
    ]);
    setTodo({ text: "", isChecked: false });
  }
  function handleDelete(deleteItem) {
    setAllTodos((prevValues) =>
      prevValues.filter((item) => item.text !== deleteItem.text)
    );
  }
  function handleCheck(checkedItem) {
    setAllTodos((prevValues) =>
      prevValues.map((item) =>
        item.text === checkedItem.text
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );
  }
  return (
    <Box component={"section"} sx={{ m: 2 }}>
      <Typography variant={"h1"} sx={{ fontSize: 20, fontWeight: 500 }}>
        Dashboard Overview
      </Typography>
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
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        <Todo
          todo={todo}
          allTodos={allTodos}
          handleAddTodo={handleAddTodo}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
        />
      </Box>
    </Box>
  );
}
