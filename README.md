# **AirPurify - Air Purifier Control System**  

## **Overview**  
AirPurify is a **React-based** web application designed to **monitor and control an air purifier**. It allows users to:  
- Adjust **fan speed** and **mode** of the purifier.  
- View **room and city AQI (Air Quality Index)**.  
- Authenticate users with a **login/signup system**.  
- Navigate via a **responsive navbar**.  

---

## **Tech Stack**  
- **Frontend:** React.js   
- **Styling:** CSS  
- **Geolocation & AQI APIs:**  
  - [BigDataCloud Reverse Geocoding](https://www.bigdatacloud.com/) (City Name)  
  - [AQICN API](https://aqicn.org/api/) (City AQI Data)  

---

## **Project Structure**  

📁 **src/**  
 ├── 📁 **components/** (React UI components)  
 │   ├── `Controls.js` - Device control panel (Fan Speed & Mode)  
 │   ├── `Dashboard.js` - AQI monitoring (Room & City AQI)  
 │   ├── `LoginPage.js` - User login page  
 │   ├── `SignupPage.js` - User signup page  
 │   ├── `Navbar.js` - Navigation bar  
 ├── 📁 **CSS/** (Stylesheets for UI components)  
 ├── `App.js` - Main app entry  
 ├── `index.js` - React app initialization  

---

## **Installation & Setup**  

### **1. Clone the Repository**  
```sh
git clone https://github.com/your-username/AirPurify.git
cd AirPurify
```
### **2. Install Dependencies**  
```sh
npm install
```
### **3. Start the development server**  
```sh
npm start
```

# Features

1. **Device Control Panel (Controls.js)**
   - Users can select fan speed (Low, Medium, High).
   - Users can choose a mode (Auto, Manual, Eco).
   - Changes update the backend API.

2. **Air Quality Dashboard (Dashboard.js)**
   - Fetches room AQI from the device.
   - Uses geolocation to fetch city AQI using an external API.

3. **Authentication System**
   - Login & Signup pages (LoginPage.js, SignupPage.js).
   - State management for form inputs & errors.

4. **Navigation Bar (Navbar.js)**
   - Links to Home, Dashboard, Login, and Signup.
   - Mobile-friendly hamburger menu.


# API Endpoints Used

| Feature          | Method | Endpoint                                                   | Description                                  |
|------------------|--------|------------------------------------------------------------|----------------------------------------------|
| Get Fan Speed    | GET    | /api/control/fan-speed                                     | Retrieves current fan speed                 |
| Set Fan Speed    | POST   | /api/control/fan-speed                                     | Updates fan speed                           |
| Get Mode         | GET    | /api/control/mode                                          | Retrieves current mode                      |
| Set Mode         | POST   | /api/control/mode                                          | Updates mode                                |
| Get Room AQI     | GET    | /api/control/aqi                                           | Fetches AQI from the air purifier           |
| Get City AQI     | GET    | https://api.waqi.info/feed/{city}/?token=YOUR_API_TOKEN     | Retrieves external city AQI                 |

