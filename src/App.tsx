import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login/Index";
import { NavBar } from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import { Comments } from "./Components/Comments";
import ErrorBoundary from "./Components/ErrorBoundary";
import { NotFound } from "./Components/NotFound";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <NavBar />
        <Routes>
          <Route path="/" element={<Comments />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
