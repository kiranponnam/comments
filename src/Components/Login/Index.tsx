import React, { FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { saveSession } from "../../redux/Session/session.service";
import { useDispatch, useSelector } from "react-redux";
import { updateSession } from "../../redux/Session/session.slice";
import "./style.css";
import { Typography } from "@mui/material";

const Login: FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state?.session);

  const googleResponse = (googleRes: any) => {
    const userObj = jwt_decode(googleRes?.credential);
    saveSession(userObj);
    dispatch(updateSession(userObj));
  };

  useEffect(() => {
    /* global google */
    // @ts-ignore
    const googleResource = google?.accounts?.id;
    googleResource.initialize({
      client_id:
        "1062453786809-ugpp78qr9gi49hqv38piobgsk188e9f3.apps.googleusercontent.com",
      callback: googleResponse,
    });
    googleResource.renderButton(window.document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      shape: "large",
    });
  }, []);

  return (
    <div className="login-form">
      <Typography component="h1" variant="h5" style={{ margin: "16px" }}>
        Sign in
      </Typography>
      {userData?.data?.payload ? (
        <Navigate to="/" />
      ) : (
        <div id="signInDiv">SignIn</div>
      )}
    </div>
  );
};
export default Login;
