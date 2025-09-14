import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValues) => ({ ...prevValues, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(`${user.email} ${user.password}`);
    setUser({ email: "", password: "" });
  }

  function handleClick() {
    navigate(`/register`);
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography
        variant={"h1"}
        sx={{ fontSize: 20, fontWeight: 500, mb: 1.5 }}
      >
        Login
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <TextField
          type={"email"}
          label={"Email"}
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        <TextField
          type={"password"}
          label={"Password"}
          name="password"
          onChange={handleChange}
          value={user.password}
        />
        <Box>
          <Typography sx={{ fontSize: 14 }}>
            Don't have an account?
            <span
              style={{ cursor: "pointer", color: "#1d95e6" }}
              onClick={handleClick}
            >
              {" "}
              Register here
            </span>
          </Typography>
        </Box>
        <Button variant={"contained"} type={"submit"}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
