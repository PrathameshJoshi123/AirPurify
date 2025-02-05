import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Controls from "./components/Controls";
import Home from "./components/Home";
import "./CSS/App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <div className="dashboard-controls-container">
                <Dashboard />
                <Controls />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
