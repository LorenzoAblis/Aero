import { useState, useEffect } from "react";
import WeatherService from "./services/WeatherService.js";
import AirQualityService from "./services/AirQualityService.js";

import "./App.scss";
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

  const fetchWeatherData = async () => {
    await weatherService.fetchWeatherData(selectedLocation);
    await airQualityService.fetchAirQualityData();

    setCurrentWeatherData(weatherService.currentWeatherData);
    setHourlyWeatherData(weatherService.hourlyWeatherData);
    setWeeklyWeatherData(weatherService.weeklyWeatherData);
    setAirQualityData(airQualityService.currentAirQualityData);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

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
    </main>
  );
}

export default App;
