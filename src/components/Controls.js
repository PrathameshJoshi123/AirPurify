import React, { useState, useEffect } from "react";
import axios from "axios";
import '../CSS/Controls.css' 

//This is react component to control settings of the device

const Controls = () => {
  
  const [fanSpeed, setFanSpeed] = useState("auto");
  const [mode, setMode] = useState("auto");

  useEffect(() => {
    // To fetch the current control settings from device
    const fetchControls = async () => {
        try {
          // Fetch fan speed from the backend api from the device
          const { data } = await axios.get("/api/control/fan-speed");
          setFanSpeed(data.fanSpeed); // Update fan speed 
        } catch (err) {
          console.error("Failed to fetch fan speed:", err);
        }

        try {
          // Fetch mode from the backend api from device
          const { data } = await axios.get("/api/control/mode");
          setMode(data.mode); // Update mode state
        } catch (err) {
          console.error("Failed to fetch mode:", err);
        }
      }
    fetchControls();
  }, []);

  // Function to handle fan speed selection and update the backend to api
  const handleFanSpeedChange = async (e) => {
    const selectedSpeed = e.target.value; 
    setFanSpeed(selectedSpeed); 

      try {
        // Send the updated fan speed to the backend
        await axios.post(
          "/api/control/fan-speed",
          { speed: selectedSpeed },
        );
      } catch (err) {
        console.error("Failed to update fan speed:", err);
      }
    }
  

  // Function to handle mode selection and update the  to api
  const handleModeChange = async (e) => {
    const selectedMode = e.target.value; 
    setMode(selectedMode); 

      try {
        // Send the updated mode to the backend
        await axios.post(
          "/api/control/mode",
          { mode: selectedMode },
        );
      } catch (err) {
        console.error("Failed to update mode:", err);
      }
    }

  return (
    <div className="control-panel-container">
      <section className="control-panel">
        <h2>Control Panel</h2>
        
        {/* Fan Speed Control Dropdown */}
        <div className="control-item">
          <label>
            Fan Speed
            <select value={fanSpeed} onChange={handleFanSpeedChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        {/* Mode Control Dropdown */}
        <div className="control-item">
          <label>
            Mode
            <select value={mode} onChange={handleModeChange}>
              <option value="auto">Auto</option>
              <option value="manual">Manual</option>
              <option value="eco">Eco</option>
            </select>
          </label>
        </div>
      </section>
    </div>
  );
};

export default Controls;
