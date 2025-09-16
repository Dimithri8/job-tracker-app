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

  useEffect(() => {
    async function getTodos() {
      const response = await fetch(`http://localhost:5000/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAllTodos(data.todos);
      }
    }
    getTodos();
  }, []);

  function handleChange(event) {
    setTodo((prevValues) => ({ ...prevValues, text: event.target.value }));
  }
  async function handleAddTodo(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setAllTodos((prevItems) => [...prevItems, data.todo]);
    }

    setTodo({ text: "", isChecked: false });
  }
  async function handleDelete(deleteItem) {
    const response = await fetch(
      `http://localhost:5000/todos/${deleteItem._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setAllTodos((prevValues) =>
        prevValues.filter((item) => item._id !== deleteItem._id)
      );
    }
  }
  async function handleCheck(checkedItem) {
    const updated = { isChecked: !checkedItem.isChecked };
    const response = await fetch(
      `http://localhost:5000/todos/${checkedItem._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setAllTodos((prevValues) =>
        prevValues.map((item) =>
          item._id === checkedItem._id
            ? { ...item, isChecked: updated.isChecked }
            : item
        )
      );
    } else {
      console.error(data.error);
    }
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
