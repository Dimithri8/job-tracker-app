import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Checkbox,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Todo({
  handleChange,
  handleAddTodo,
  handleDelete,
  handleCheck,
  allTodos,
  todo,
}) {
  return (
    <Box component={Paper} sx={{ p: 3 }}>
      <Typography variant={"h2"} sx={{ fontSize: 20, fontWeight: 400 }}>
        Quick Todo
      </Typography>
      <Typography variant={"body1"} sx={{ fontSize: 13, fontWeight: 400 }}>
        Todos will be removed after 24 hours
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleAddTodo}
        sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
      >
        <TextField
          variant={"standard"}
          placeholder="Add Todo"
          name="todo"
          value={todo.text}
          onChange={handleChange}
        />
        <Button size={"small"} type={"submit"} variant={"contained"}>
          Add Todo
        </Button>
      </Box>

      <List>
        {allTodos.map((item) => (
          <ListItem
            disablePadding
            key={item._id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(item)}>
                <DeleteOutlineIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                checked={item.isChecked}
                onChange={() => handleCheck(item)}
              />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
