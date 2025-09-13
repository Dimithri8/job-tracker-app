import { Box, Typography, Paper } from "@mui/material";
import Todo from "../../components/Todo/Todo";
import { useState } from "react";
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
