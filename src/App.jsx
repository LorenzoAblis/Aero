import { useState, useEffect } from "react";
import WeatherService from "./services/WeatherService.js";

import "./App.scss";
import Current from "./components/Current.jsx";
import Hourly from "./components/Hourly.jsx";
import Weekly from "./components/Weekly.jsx";

//https://api.open-meteo.com/v1/forecast?latitude=42.0664&longitude=-87.9373&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState([]);

  const weatherService = new WeatherService();

  const fetchWeatherData = async () => {
    await weatherService.fetchWeatherData();
    setCurrentWeatherData(weatherService.currentWeatherData);
    setHourlyWeatherData(weatherService.hourlyWeatherData);
    setWeeklyWeatherData(weatherService.weeklyWeatherData);
  };

  useEffect(() => {
    fetchWeatherData();

  }, []);

  return (
    <main>
      {currentWeatherData && <Current data={currentWeatherData} />}
      {hourlyWeatherData.length > 0 && <Hourly data={hourlyWeatherData} />}
      {weeklyWeatherData.length > 0 && <Weekly data={weeklyWeatherData} />}
    </main>
  );
}

export default App;
