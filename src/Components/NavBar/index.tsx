import React, { FC, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Avatar, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmDialog from "../ConfirmDialog";

export const NavBar: FC<any> = (props: any) => {
  const [isLogoutProfile, setLogoutProfile] = useState<boolean>(false);
  const userData = useSelector((state: any) => state?.session);

  const onConfirm = (event: any) => {
    if (event === "confirm") {
      window.location.reload();
      sessionStorage.removeItem("userDetails");
    }
    setLogoutProfile(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ConfirmDialog
        open={isLogoutProfile}
        onConfirm={onConfirm}
        title="Confirmation"
        dialogContentText={
          <>
            Are you sure you want to logout? <br /> Please confirm
          </>
        }
      />
      <AppBar
        position="static"
        style={{
          position: "fixed",
          left: "0",
          right: "0",
          top: "0",
          zIndex: "321",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jira comments
          </Typography>
          <Tooltip title={userData?.data?.payload?.name}>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt="Profile_Pic"
                src={userData?.data?.payload?.picture}
              />
            </IconButton>
          </Tooltip>
          {userData?.data?.payload?.email ? (
            <Button onClick={() => setLogoutProfile(true)} color="inherit">
              Logout
            </Button>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#ffff" }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
