import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValues) => ({ ...prevValues, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      `${user.firstName} ${user.lastName} ${user.email} ${user.password}`
    );
    setUser({ firstName: "", lastName: "", email: "", password: "" });
  }
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/login`);
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
        Create an account
      </Typography>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          type={"text"}
          label={"First Name"}
          name="firstName"
          onChange={handleChange}
          value={user.firstName}
        />
        <TextField
          type={"text"}
          label={"Last Name"}
          name="lastName"
          onChange={handleChange}
          value={user.lastName}
        />
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
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#1d95e6" }}
              onClick={handleClick}
            >
              Login Here
            </span>
          </Typography>
        </Box>
        <Button variant={"contained"} type={"submit"}>
          Create Account
        </Button>
      </Box>
    </Box>
  );
}
