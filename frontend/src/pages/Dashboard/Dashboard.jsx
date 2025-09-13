import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Todo from "../../components/Todo/Todo";
import MetricCard from "../../components/MetricCard/MetricCard";

export default function Dashboard() {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  function handleChange(event) {
    const userInput = event.target.value;
    setTodo(userInput);
  }
  function handleAddTodo(e) {
    e.preventDefault();
    setAllTodos((prevItems) => [...prevItems, todo]);
    setTodo("");
  }
  function handleDelete(deleteItem) {
    setAllTodos((prevValues) =>
      prevValues.filter((item) => item !== deleteItem)
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
        <MetricCard label={"Total Applications"} value={5} />
        <MetricCard label={"Total Interviews"} value={5} />
        <MetricCard label={"Offers"} value={5} />
        <MetricCard label={"Rejections"} value={5} />
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
        />
      </Box>
    </Box>
  );
}
