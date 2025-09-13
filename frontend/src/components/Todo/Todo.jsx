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
          value={todo}
          onChange={handleChange}
        />
        <Button size={"small"} type={"submit"} variant={"contained"}>
          Add Todo
        </Button>
      </Box>

      <List>
        {allTodos.map((item, index) => (
          <ListItem
            disablePadding
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(item)}>
                <DeleteOutlineIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
