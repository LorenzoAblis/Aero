import { useState } from "react";
import PropTypes from "prop-types";
import SearchService from "../services/SearchService";
import WeatherService from "../services/WeatherService";
import AirQualityService from "../services/AirQualityService";

import "../styles/Search.scss";

const Search = ({
  setSelectedLocation,
  setCurrentWeatherData,
  setHourlyWeatherData,
  setWeeklyWeatherData,
  setAirQualityData,
}) => {
  const searchService = new SearchService();
  const weatherService = new WeatherService();
  const airQualityService = new AirQualityService();

  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      searchService.setQuery(query);
      await searchService.fetchSearchApi();
      setSearchData(searchService.searchData);
    }
  };

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setQuery(location.address);
    setSearchData([]);

    await weatherService.fetchWeatherData(location);
    await airQualityService.fetchAirQualityData();

    setCurrentWeatherData(weatherService.currentWeatherData);
    setHourlyWeatherData(weatherService.hourlyWeatherData);
    setWeeklyWeatherData(weatherService.weeklyWeatherData);
    setAirQualityData(airQualityService.currentAirQualityData);
  };

  return (
    <section>
      <div className="search-bar">
        <i className="bi bi-search"></i>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => setQuery("")}>
          <i className="bi bi-x-circle-fill"></i>
        </button>
      </div>
      {searchData.length > 0 && (
        <div className="suggestions">
          {searchData.map((search, index) => (
            <button
              key={index}
              className="suggestion-card"
              onClick={() => handleLocationSelect(search)}
            >
              {search.address}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

Search.propTypes = {
  setSelectedLocation: PropTypes.func.isRequired,
  setCurrentWeatherData: PropTypes.func.isRequired,
  setHourlyWeatherData: PropTypes.func.isRequired,
  setWeeklyWeatherData: PropTypes.func.isRequired,
  setAirQualityData: PropTypes.func.isRequired,
};

export default Search;
