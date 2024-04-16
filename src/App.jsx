import { useState, useEffect } from "react";
import WeatherService from "./services/WeatherService.js";
import AirQualityService from "./services/AirQualityService.js";

import "./App.scss";
import { preloader } from "./assets/weatherIcons/index.js";
import Search from "./components/Search.jsx";
import Current from "./components/Current.jsx";
import Hourly from "./components/Hourly.jsx";
import Weekly from "./components/Weekly.jsx";
import Menu from "./components/Menu.jsx";
import HourView from "./components/HourView.jsx";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState([]);
  const [airQualityData, setAirQualityData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [query, setQuery] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [settings, setSettings] = useState({});
  const [selectedHour, setSelectedHour] = useState({});
  const [showHourView, setShowHourView] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [showDayView, setShowDayView] = useState(false);

  const weatherService = new WeatherService();
  const airQualityService = new AirQualityService();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({
            lat: parseFloat(latitude.toFixed(2)),
            long: parseFloat(longitude.toFixed(2)),
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchData = async () => {
    try {
      if (!selectedLocation) return;

      const storedSettingsJSON = localStorage.getItem("settings");
      const storedSettings = storedSettingsJSON
        ? JSON.parse(storedSettingsJSON)
        : {};

      setSettings(storedSettings);

      await Promise.all([
        airQualityService.fetchAirQualityData(selectedLocation),
        weatherService.fetchWeatherData(selectedLocation, storedSettings),
      ]);

      setCurrentWeatherData(weatherService.currentWeatherData);
      setHourlyWeatherData(weatherService.hourlyWeatherData);
      setWeeklyWeatherData(weatherService.weeklyWeatherData);
      setAirQualityData(airQualityService.currentAirQualityData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSavedLocations = () => {
    const storedLocationsJSON = localStorage.getItem("locations");
    const storedLocations = storedLocationsJSON
      ? JSON.parse(storedLocationsJSON).locations
      : [];
    setSavedLocations(storedLocations);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".menu")) {
      setShowMenu(false);
      setShowHourView(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedLocation]);

  return (
    <>
      <main onClick={handleOutsideClick}>
        <Search
          setSelectedLocation={setSelectedLocation}
          query={query}
          setQuery={setQuery}
          selectedLocation={selectedLocation}
          fetchSavedLocations={fetchSavedLocations}
          setSavedLocations={setSavedLocations}
          savedLocations={savedLocations}
          setShowMenu={setShowMenu}
        />
        {currentWeatherData && (
          <Current
            weatherData={currentWeatherData}
            airQualityData={airQualityData}
            settings={settings}
          />
        )}
        {hourlyWeatherData.length > 0 && (
          <Hourly
            data={hourlyWeatherData}
            setShowHourView={setShowHourView}
            setSelectedHour={setSelectedHour}
          />
        )}
        {weeklyWeatherData.length > 0 && <Weekly data={weeklyWeatherData} />}
        {!currentWeatherData && <img src={preloader} className="preloader" />}
      </main>
      <Menu
        setSelectedLocation={setSelectedLocation}
        savedLocations={savedLocations}
        setSavedLocations={setSavedLocations}
        fetchSavedLocations={fetchSavedLocations}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        fetchData={fetchData}
      />
      <HourView showHourView={showHourView} selectedHour={selectedHour} />
    </>
  );
}

export default App;
