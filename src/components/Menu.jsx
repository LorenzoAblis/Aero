import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import "../styles/Menu.scss";

const Menu = ({
  setSelectedLocation,
  savedLocations,
  setSavedLocations,
  fetchSavedLocations,
  setShowMenu,
  showMenu,
  fetchData,
}) => {
  const units = {
    temp: [
      {
        label: "Fahrenheit °F",
        value: "fahrenheit",
      },
      {
        label: "Celsius °C",
        value: "celsius",
      },
    ],
    wind: [
      {
        label: "Mph",
        value: "mph",
      },
      {
        label: "Km/h",
        value: "kmh",
      },
      {
        label: "m/s",
        value: "ms",
      },
      {
        label: "Knots",
        value: "kn",
      },
    ],
    hour: [
      {
        label: "8 hours",
        value: "8",
      },
      {
        label: "16 hours",
        value: "16",
      },
      {
        label: "24 hours",
        value: "24",
      },
    ],
    week: [
      {
        label: "7 days",
        value: "7",
      },
      {
        label: "10 days",
        value: "10",
      },
      {
        label: "14 days",
        value: "14",
      },
    ],
  };

  const [selectedSettings, setSelectedSettings] = useState(() => {
    const savedSettings = localStorage.getItem("settings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          temp: units.temp[0].value,
          wind: units.wind[0].value,
        };
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowMenu(false);
  };

  const handleLocationDelete = (index) => {
    const updatedLocations = [...savedLocations];
    updatedLocations.splice(index, 1);

    setSavedLocations(updatedLocations);
    localStorage.setItem(
      "locations",
      JSON.stringify({ locations: updatedLocations })
    );
  };

  const handleSettingsChange = (e, unitType) => {
    const { value } = e.target;
    setSelectedSettings({
      ...selectedSettings,
      [unitType]: value,
    });

    localStorage.setItem("settings", JSON.stringify(selectedSettings));
  };

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(selectedSettings));
    fetchData();
  }, [selectedSettings]);

  return (
    <aside className={`menu-aside ${showMenu ? "show-menu" : "hide-menu"}`}>
      <section className="saved-locations">
        <h1>Saved Locations</h1>
        {savedLocations.map((location, index) => (
          <div key={index}>
            <div className="location" key={index}>
              <p onClick={() => handleLocationSelect(location)}>
                {location.address || "Current Location"}
              </p>
              <button onClick={() => handleLocationDelete(index)}>
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        ))}
      </section>
      <section className="settings">
        <h1>Settings</h1>
        {Object.entries(units).map(([key, options], index) => (
          <select
            key={index}
            value={selectedSettings[key]}
            onChange={(e) => handleSettingsChange(e, key)}
          >
            {options.map((option, innerIndex) => (
              <option key={innerIndex} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </section>
    </aside>
  );
};

Menu.propTypes = {
  setSelectedLocation: PropTypes.func.isRequired,
  savedLocations: PropTypes.array.isRequired,
  setSavedLocations: PropTypes.func.isRequired,
  fetchSavedLocations: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default Menu;
