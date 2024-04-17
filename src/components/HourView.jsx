import PropTypes from "prop-types";
import { useEffect } from "react";

import * as weatherIcons from "../assets/weatherIcons";
import "../styles/HourView.scss";

const ConditionCard = ({ title, icon, text, color }) => {
  return (
    <div className="condition-card">
      <div>
        <i className={icon} style={{ color: `${color}` }}></i>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

ConditionCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const HourView = ({
  data,
  showHourView,
  setSelectedHour,
  selectedHour,
  settings,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        const currentIndex = data.findIndex((hour) => hour === selectedHour);
        if (currentIndex < data.length - 1) {
          setSelectedHour(data[currentIndex + 1]);
        }
      } else if (event.key === "ArrowLeft") {
        const currentIndex = data.findIndex((hour) => hour === selectedHour);
        if (currentIndex > 0) {
          setSelectedHour(data[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, selectedHour, setSelectedHour]);
  return (
    <aside className={`hour-aside ${showHourView ? "show-menu" : "hide-menu"}`}>
      <div className="hour-card">
        <div className="content">
          <div className="temp">
            <h1>{selectedHour.time}</h1>
            <img src={weatherIcons[selectedHour.weather_code_icon]} alt="" />
            <h2>{`${selectedHour.temp}°`}</h2>
            <span>{`Feels like ${selectedHour.feelslike}°`}</span>
          </div>
          <div className="conditions">
            <ConditionCard
              title="Wind"
              icon="bi bi-arrow-up-left-circle-fill"
              text={`${selectedHour.wind_speed} ${settings.wind} ${selectedHour.wind_direction}`}
              color="lightGray"
            />
            <ConditionCard
              title="Humidity"
              icon="bi bi-droplet-fill"
              text={`${selectedHour.humidity}%`}
              color="lightblue"
            />
            <ConditionCard
              title="Pressure"
              icon="bi bi-graph-up-arrow"
              text={`${selectedHour.pressure} hPa`}
              color="magenta"
            />
            <ConditionCard
              title="UV Index"
              icon="bi bi-brightness-low-fill"
              text={`${selectedHour.uv_index} (${selectedHour.uv_class})`}
              color="pink"
            />
            <ConditionCard
              title="Chances of Rain"
              icon="bi bi-cloud-drizzle-fill"
              text={`${selectedHour.precip}%`}
              color="lightblue"
            />
          </div>
        </div>
        <div className="timeline">
          {data.map((hour, index) => (
            <button
              key={index}
              className={hour == selectedHour ? "filled" : ""}
              onClick={() => setSelectedHour(hour)}
            >
              {hour.time}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

HourView.propTypes = {
  data: PropTypes.array.isRequired,
  showHourView: PropTypes.bool.isRequired,
  setSelectedHour: PropTypes.func.isRequired,
  selectedHour: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default HourView;
