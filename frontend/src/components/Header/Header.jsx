import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function Header({ className }) {
  const [isExpand, setIsExpand] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  function handleProfileViewExpand() {
    setIsExpand((prevValue) => !prevValue);
  }
  const user = {
    profileImg: "src/assets/images/profile-img.avif",
    username: "Dimithri Dananjaya",
  };
  function handleOpenSettings() {
    setIsSettingsOpen((prevValue) => !prevValue);
  }
  function handleExitSettings() {
    handleOpenSettings();
    setIsExpand();
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
            src={user.profileImg}
            sx={{
              height: 40,
              width: 40,
              borderRadius: 10,
              objectFit: "cover",
            }}
          />
          <Typography noWrap sx={{ fontSize: 14 }}>
            {user.username}
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
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={handleExitSettings}
            variant={"outlined"}
            type="button"
          >
            Cancel
          </Button>
          <Button variant={"contained"} type="button">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
