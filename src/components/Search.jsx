import { useState } from "react";
import PropTypes from "prop-types";
import SearchService from "../services/SearchService";

import "../styles/Search.scss";

const Search = ({
  setSelectedLocation,
  query,
  setQuery,
  selectedLocation,
}) => {
  const searchService = new SearchService();

  const [searchData, setSearchData] = useState([]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      searchService.setQuery(query);
      await searchService.fetchSearchApi();
      setSearchData(searchService.searchData);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setQuery(location.address);
    setSearchData([]);
  };

  const handleBookmark = () => {

    const storedLocationsJSON = localStorage.getItem("locations");
    const storedLocations = storedLocationsJSON
      ? JSON.parse(storedLocationsJSON)
      : { locations: [] };


    const existingIndex = storedLocations.locations.findIndex(
      (location) => location.address === selectedLocation.address
    );


    if (existingIndex !== -1) {
      storedLocations.locations.splice(existingIndex, 1);
    } else {
      storedLocations.locations.push(selectedLocation);
    }

    const updatedLocationsJSON = JSON.stringify(storedLocations);
    localStorage.setItem("locations", updatedLocationsJSON);
  };


  const getAddress = () => {
    if (selectedLocation != null) {
      return selectedLocation.address || "Current Location";
    }
  };

  return (
    <section>
      <div className="navbar">
        <i className="bi bi-list menu"></i>
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
          <i className="bi bi-bookmark"></i>
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
};

export default Search;
