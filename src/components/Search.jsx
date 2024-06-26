import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchService from "../services/SearchService";

import "../styles/Search.scss";

const Search = ({
  setSelectedLocation,
  query,
  setQuery,
  selectedLocation,
  fetchSavedLocations,
  setSavedLocations,
  savedLocations,
  setShowMenu,
}) => {
  const searchService = new SearchService();

  const [searchData, setSearchData] = useState([]);
  const [isSavedLocation, setIsSavedLocation] = useState(false);

  const checkSaveState = () => {
    if (selectedLocation) {
      const isSaved = savedLocations.some(
        (location) =>
          location.lat === selectedLocation.lat &&
          location.long === selectedLocation.long
      );
      setIsSavedLocation(isSaved);
    } else {
      setIsSavedLocation(false);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      searchService.setQuery(query);
      await searchService.fetchSearchApi();
      setSearchData(searchService.searchData);
    }
  };

  const handleLocationSelect = (location) => {
    const clampedLocation = {
      ...location,
      lat: parseFloat(location.lat.toFixed(2)),
      long: parseFloat(location.long.toFixed(2)),
    };

    setSelectedLocation(clampedLocation);
    setQuery(clampedLocation.address);
    setSearchData([]);
  };

  const handleBookmark = () => {
    const storedLocationsJSON = localStorage.getItem("locations");
    const storedLocations = storedLocationsJSON
      ? JSON.parse(storedLocationsJSON)
      : { locations: [] };

    const clampedLocation = {
      ...selectedLocation,
      lat: parseFloat(selectedLocation.lat.toFixed(2)),
      long: parseFloat(selectedLocation.long.toFixed(2)),
    };

    const existingIndex = storedLocations.locations.findIndex(
      (location) =>
        location.lat === clampedLocation.lat &&
        location.long === clampedLocation.long
    );

    if (existingIndex !== -1) {
      storedLocations.locations.splice(existingIndex, 1);
    } else {
      storedLocations.locations.push(clampedLocation);
    }

    const updatedLocationsJSON = JSON.stringify(storedLocations);
    localStorage.setItem("locations", updatedLocationsJSON);

    setSavedLocations(storedLocations.locations);
  };

  const getAddress = () => {
    if (selectedLocation != null) {
      return selectedLocation.address || "Current Location";
    }
  };

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  useEffect(() => {
    checkSaveState();
  }, [selectedLocation, savedLocations]);

  return (
    <section>
      <div className="navbar">
        <i className="bi bi-list menu" onClick={() => setShowMenu(true)}></i>
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
      <div className="location">
        <h1>{getAddress()}</h1>
        <button onClick={handleBookmark}>
          {isSavedLocation ? (
            <i className="bi bi-bookmark-fill filled"></i>
          ) : (
            <i className="bi bi-bookmark"></i>
          )}
        </button>
      </div>
    </section>
  );
};

Search.propTypes = {
  setSelectedLocation: PropTypes.func.isRequired,
  query: PropTypes.string,
  setQuery: PropTypes.func.isRequired,
  selectedLocation: PropTypes.object,
  fetchSavedLocations: PropTypes.func.isRequired,
  setSavedLocations: PropTypes.func.isRequired,
  savedLocations: PropTypes.array.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

export default Search;
