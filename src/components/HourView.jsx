import PropTypes from "prop-types";

import * as weatherIcons from "../assets/weatherIcons";
import "../styles/HourView.scss";

const HourView = ({ showHourView, selectedHour }) => {
  return (
    <aside className={`hour-aside ${showHourView ? "show-menu" : "hide-menu"}`}>
      <div className="hour-card">
        <h3>{selectedHour.time}</h3>
        <img src={weatherIcons[selectedHour.weather_code_icon]} alt="" />
        <p>{`${selectedHour.uv_index}°`}</p>
      </div>
    </aside>
  );
};

HourView.propTypes = {
  showHourView: PropTypes.bool.isRequired,
  selectedHour: PropTypes.object.isRequired,
};

export default HourView;
