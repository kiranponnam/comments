import React from "react";
import { Navigate } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
      <h3>Page Not Found</h3>
      <p>
        <Navigate to="/" />
      </p>
    </div>
  );
};
