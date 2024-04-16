import PropTypes from "prop-types";

import * as weatherIcons from "../assets/weatherIcons";
import "../styles/HourView.scss";

const HourView = ({ showHourView, selectedHour, settings }) => {
  return (
    <aside className={`hour-aside ${showHourView ? "show-menu" : "hide-menu"}`}>
      <div className="hour-card">
        <div className="temp">
          <h1>{selectedHour.time}</h1>
          <img src={weatherIcons[selectedHour.weather_code_icon]} alt="" />
          <h2>{`${selectedHour.temp}°`}</h2>
          <span>{`Feels like ${selectedHour.feelslike}°`}</span>
        </div>
        <div className="conditions">
          <div className="condition-card">
            <i className="bi bi-arrow-up-left-circle-fill"></i>
            <div>
              <h3>Wind</h3>
              <p>{`${selectedHour.wind_speed} ${settings.wind} ${selectedHour.wind_direction}`}</p>
            </div>
          </div>
          <div className="condition-card">
            <i className="bi bi-arrow-up-left-circle-fill"></i>
            <div>
              <h3>Wind</h3>
              <p>{`${selectedHour.wind_speed} ${settings.wind} ${selectedHour.wind_direction}`}</p>
            </div>
          </div>
          <div className="condition-card">
            <i className="bi bi-arrow-up-left-circle-fill"></i>
            <div>
              <h3>Wind</h3>
              <p>{`${selectedHour.wind_speed} ${settings.wind} ${selectedHour.wind_direction}`}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

HourView.propTypes = {
  showHourView: PropTypes.bool.isRequired,
  selectedHour: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default HourView;
