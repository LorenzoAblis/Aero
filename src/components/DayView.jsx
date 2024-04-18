import PropTypes from "prop-types";
import { useEffect } from "react";

import * as weatherIcons from "../assets/weatherIcons";
import { ConditionCard } from "./Current";
import "../styles/DayView.scss";

const DayView = ({
  data,
  showDayView,
  setSelectedDay,
  selectedDay,
  settings,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        const currentIndex = data.findIndex((hour) => hour === selectedDay);
        if (currentIndex < data.length - 1) {
          setSelectedDay(data[currentIndex + 1]);
        }
      } else if (event.key === "ArrowLeft") {
        const currentIndex = data.findIndex((hour) => hour === selectedDay);
        if (currentIndex > 0) {
          setSelectedDay(data[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, selectedDay, setSelectedDay]);
  return (
    <aside className={`day-aside ${showDayView ? "show-menu" : "hide-menu"}`}>
      <div className="day-card">
        <div className="content">
          <div className="temp">
            <h1>{selectedDay.dayLong}</h1>
            <h2>{selectedDay.date}</h2>
            <img src={weatherIcons[selectedDay.weather_code_icon]} alt="" />
            <h4>{`${selectedDay.temp_min}° / ${selectedDay.temp_max}° `}</h4>
            <span>{`Feels like ${selectedDay.feelslike_min}° / ${selectedDay.feelslike_max}°`}</span>
          </div>
          <div className="conditions">
            <ConditionCard
              title="Rain Chance"
              icon="bi bi-cloud-drizzle-fill"
              value={`${selectedDay.precip}%`}
              color="lightblue"
            />
            <ConditionCard
              title="UV Index"
              icon="bi bi-brightness-low-fill"
              value={`${selectedDay.uv} (${selectedDay.uvClass})`}
              color="pink"
            />
            <ConditionCard
              title="Sunrise"
              icon="bi bi-sunrise-fill"
              value={`${selectedDay.sunrise}`}
              color="orange"
            />
            <ConditionCard
              title="Sunset"
              icon="bi bi-sunset-fill"
              value={`${selectedDay.sunset}`}
              color="purple"
            />
            <ConditionCard
              title="Wind"
              icon="bi bi-arrow-up-left-circle-fill"
              value={`${selectedDay.wind_speed} ${settings.wind} ${selectedDay.wind_direction}`}
              color="lightgray"
            />
            <ConditionCard
              title="Gusts"
              icon="bi bi-wind"
              value={`${selectedDay.wind_gusts} ${settings.wind} ${selectedDay.wind_direction}`}
              color="lightgreen"
            />
          </div>
        </div>
        <div className="timeline">
          {data.map((day, index) => (
            <button
              key={index}
              className={day == selectedDay ? "filled" : ""}
              onClick={() => setSelectedDay(day)}
            >
              {day.date}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

DayView.propTypes = {
  data: PropTypes.array.isRequired,
  showDayView: PropTypes.bool.isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  selectedDay: PropTypes.object,
  settings: PropTypes.object.isRequired,
};

export default DayView;
