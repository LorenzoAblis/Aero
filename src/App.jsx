import { useState, useEffect } from "react";
import WeatherService from "./services/WeatherService.js";
import AirQualityService from "./services/AirQualityService.js";

import "./App.scss";
import { preloader } from "./assets/weatherIcons/index.js";
import Search from "./components/Search.jsx";
import Current from "./components/Current.jsx";
import Hourly from "./components/Hourly.jsx";
import Weekly from "./components/Weekly.jsx";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState([]);
  const [airQualityData, setAirQualityData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const weatherService = new WeatherService();
  const airQualityService = new AirQualityService();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User location:", { latitude, longitude });
          setSelectedLocation({ lat: latitude, long: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchData = async () => {
    try {
      if (!selectedLocation) return;
      await Promise.all([
        airQualityService.fetchAirQualityData(selectedLocation),
        weatherService.fetchWeatherData(selectedLocation),
      ]);
      setCurrentWeatherData(weatherService.currentWeatherData);
      setHourlyWeatherData(weatherService.hourlyWeatherData);
      setWeeklyWeatherData(weatherService.weeklyWeatherData);
      setAirQualityData(airQualityService.currentAirQualityData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedLocation]);

  return (
    <main>
      <Search
        setSelectedLocation={setSelectedLocation}
        setCurrentWeatherData={setCurrentWeatherData}
        setHourlyWeatherData={setHourlyWeatherData}
        setWeeklyWeatherData={setWeeklyWeatherData}
        setAirQualityData={setAirQualityData}
      />
      {currentWeatherData && (
        <Current
          weatherData={currentWeatherData}
          airQualityData={airQualityData}
        />
      )}
      {hourlyWeatherData.length > 0 && <Hourly data={hourlyWeatherData} />}
      {weeklyWeatherData.length > 0 && <Weekly data={weeklyWeatherData} />}

      {!currentWeatherData && <img src={preloader} className="preloader" />}
    </main>
  );
}

export default App;
