import { useState, useEffect } from "react";

import "../styles/Menu.scss";

const Menu = () => {
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
            <p>{location.address || "Current Location"}</p>
            <button>
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        ))}
      </section>
      {/* <section className="settings">
        <h1>Settings</h1>
      </section> */}
    </aside>
  );
};

export default Menu;
