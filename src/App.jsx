import { useState, useEffect } from "react";

import "./App.scss";
import Current from "./components/Current.jsx";
import Hourly from "./components/Hourly.jsx";
import Weekly from "./components/Weekly.jsx";

//https://api.open-meteo.com/v1/forecast?latitude=42.0664&longitude=-87.9373&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago

function App() {
  let apiUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=42.0664&longitude=-87.9373&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago";

  const [rawWeatherData, setRawWeatherData] = useState(null);

  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRawWeatherData(data);
      console.log("Weather data fetched successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getDateTime = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:00`;
  };

  const degreesToDirection = (degrees) => {
    degrees = (degrees + 360) % 360;

    let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    let index = Math.round(degrees / 45) % 8;

    return directions[index];
  };

  const convertTimeFormat = (timeString) => {
    const dateTime = new Date(timeString);

    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };

  const formatCurrentWeatherData = () => {
    let timeIndex = rawWeatherData["hourly"]["time"].indexOf(
      getDateTime("time")
    );

    setCurrentWeatherData((prev) => ({
      ...prev,
      temp: Math.round(rawWeatherData["hourly"]["temperature_2m"][timeIndex]),
      humidity: rawWeatherData["hourly"]["relative_humidity_2m"][timeIndex],
      feelslike: Math.round(
        rawWeatherData["hourly"]["apparent_temperature"][timeIndex]
      ),
      precip: rawWeatherData["hourly"]["precipitation_probability"][timeIndex],
      pressure: Math.round(
        rawWeatherData["hourly"]["surface_pressure"][timeIndex]
      ),
      wind_speed: Math.round(
        rawWeatherData["hourly"]["wind_speed_10m"][timeIndex]
      ),
      wind_direction: degreesToDirection(
        rawWeatherData["hourly"]["wind_direction_10m"][timeIndex]
      ),
      temp_max: Math.round(rawWeatherData["daily"]["temperature_2m_max"][0]),
      temp_min: Math.round(rawWeatherData["daily"]["temperature_2m_min"][0]),
      sunrise: convertTimeFormat(rawWeatherData["daily"]["sunrise"][0]),
      sunset: convertTimeFormat(rawWeatherData["daily"]["sunset"][0]),
      uv: rawWeatherData["daily"]["uv_index_max"][0],
    }));
  };

  return (
    <main>
      <Current />
      <Hourly />
      <Weekly />
      <button onClick={formatCurrentWeatherData}>Get Weather Data</button>
    </main>
  );
}

export default App;
