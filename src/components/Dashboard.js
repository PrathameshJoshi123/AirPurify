import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Dashboard.css"; 

// This is react component to show the aqi level of room and city

const Dashboard = () => {
  const [roomAQI, setRoomAQI] = useState(null);
  const [cityAQI, setCityAQI] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current room AQI from backend api from device
    axios.get("/api/control/aqi")
      .then((response) => {
        setRoomAQI(response.data.aqi);
      })
      .catch((error) => {
        console.error("Error fetching room AQI:", error);
      });

    // Fetch current location AQI
    const fetchCityAQI = async () => {
      try {
        const location = await getUserLocation();
        const cityAQI = await getCityAQI(location.latitude, location.longitude);
        setCityAQI(cityAQI);
      } catch (error) {
        console.error("Error fetching city AQI:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityAQI();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Air Quality Dashboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="aqi-cards">
            <div className="aqi-card room-aqi">
              <h3>Room AQI</h3>
              <p>{roomAQI !== null ? roomAQI : "No data available"}</p>
            </div>
            <div className="aqi-card city-aqi">
              <h3>City AQI</h3>
              <p>{cityAQI !== null ? cityAQI : "No data available"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Function to get user's location (latitude and longitude)
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser"));
    }
  });
};

// Function to fetch AQI based on latitude and longitude (using AQICN API)
const getCityAQI = async (latitude, longitude) => {
  try {
    // Use the reverse geocoding service to get the city name from lat and lon
    const city = await getCityNameFromCoordinates(latitude, longitude);

    // Fetch AQI data from AQICN API using the city name
    // Add Api token to get the AQI of city
    const response = await axios.get(
      `https://api.waqi.info/feed/${city}/?token=YOUR_API_TOKEN`
    );

    return response.data.data.aqi;
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    return null;
  }
};

// Function to get the city name from latitude and longitude (using a reverse geocoding API)
const getCityNameFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    return response.data.locality; // This will give the city name
  } catch (error) {
    console.error("Error getting city name:", error);
    throw new Error("City not found");
  }
};

export default Dashboard;
