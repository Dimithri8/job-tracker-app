import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function Header({ className }) {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [isExpand, setIsExpand] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // const user = {
  //   profileImg: "src/assets/images/profile-img.avif",
  //   firstName: "Dimithri",
  //   lastName: "Dananjaya",
  //   email: "dimithridananjaya924@gmail.com",
  //   password: "dimithri.123",
  // };
  const [userDetails, setUserDetails] = useState(savedUser);
  const [draftUser, setDraftUser] = useState(savedUser);

  function handleProfileViewExpand() {
    setIsExpand((prevValue) => !prevValue);
  }

  function handleOpenSettings() {
    setIsSettingsOpen((prevValue) => !prevValue);
  }
  function handleExitSettings() {
    handleOpenSettings();
    setIsExpand();
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setDraftUser((prevDetails) => ({ ...prevDetails, [name]: value }));
  }
  function handleUpdateUser(e) {
    e.preventDefault();
    setUserDetails(draftUser);
    handleExitSettings();
  }
  return (
    <>
      <Box
        className={className}
        component={"div"}
        sx={{
          backgroundColor: "white",
          boxShadow: "5px 5px 15px rgba(219, 219, 219, 0.42)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          onClick={handleProfileViewExpand}
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <Box
            component={"img"}
            src={userDetails.profileImg}
            sx={{
              height: 40,
              width: 40,
              borderRadius: 10,
              objectFit: "cover",
            }}
          />
          <Typography noWrap sx={{ fontSize: 14 }}>
            {userDetails.firstName}
          </Typography>
          <ExpandMoreIcon
            sx={{ transform: isExpand ? "rotate(180deg)" : "none" }}
          />
        </Box>
      </Box>
      <Paper
        sx={{
          display: isExpand ? "inherit" : "none",
          p: 3,
          position: "absolute",
          zIndex: 100,
          right: "15px",
          top: 60,
          width: "150px",
        }}
      >
        <Button
          onClick={handleOpenSettings}
          variant={"text"}
          disableRipple
          sx={{
            cursor: "pointer",
            color: "black",
            textTransform: "none",
            fontWeight: 400,
            "&:hover": { backgroundColor: "white" },
          }}
        >
          Settings
        </Button>
      </Paper>
      <Dialog open={isSettingsOpen}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component={"form"}
            id="profile-form"
            onSubmit={handleUpdateUser}
          >
            <Box
              component={"input"}
              name="profileImg"
              // value={userDetails.profileImg}
              onChange={handleChange}
              type={"file"}
              sx={{
                padding: 3,
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: 1,
              }}
            />
            <TextField
              name="firstName"
              value={draftUser.firstName}
              onChange={handleChange}
              type={"text"}
              label="First Name"
              variant={"standard"}
            />
            <TextField
              name="lastName"
              value={draftUser.lastName}
              onChange={handleChange}
              type={"text"}
              label="Last Name"
              variant={"standard"}
            />
            <TextField
              name="email"
              value={draftUser.email}
              onChange={handleChange}
              type={"email"}
              label="Email"
              variant={"standard"}
            />
            <TextField
              name="password"
              value={draftUser.password}
              onChange={handleChange}
              type={"password"}
              label="Password"
              variant={"standard"}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleExitSettings}
            variant={"outlined"}
            type="button"
          >
            Cancel
          </Button>
          <Button form="profile-form" variant={"contained"} type="submit">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
