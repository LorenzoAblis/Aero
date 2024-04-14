import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import "../styles/Menu.scss";

const Menu = ({ setSelectedLocation }) => {
  const [savedLocations, setSavedLocations] = useState([]);

  const fetchSavedLocations = () => {
    const storedLocationsJSON = localStorage.getItem("locations");
    const storedLocations = storedLocationsJSON
      ? JSON.parse(storedLocationsJSON).locations
      : [];
    setSavedLocations(storedLocations);
  };

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleLocationDelete = (index) => {
    const updatedLocations = [...savedLocations];
    updatedLocations.splice(index, 1);

    setSavedLocations(updatedLocations);
    localStorage.setItem("locations", JSON.stringify({ locations: updatedLocations }));
  };

  return (
    <aside>
      <header>
        <div className="search-bar">
          <i className="bi bi-search"></i>
          <input type="text" />
          <button>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </header>
      <section className="saved-locations">
        <h1>Saved Locations</h1>
        {savedLocations.map((location, index) => (
          <div className="location" key={index}>
            <p onClick={() => handleLocationSelect(location)}>{location.address || "Current Location"}</p>
            <button onClick={() => handleLocationDelete(index)}>
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        ))}
      </section>
    </aside>
  );
};

Menu.propTypes = {
  setSelectedLocation: PropTypes.func.isRequired,
};

export default Menu;
