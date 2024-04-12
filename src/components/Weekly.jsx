import PropTypes from "prop-types";
import "../styles/Weekly.scss";
import * as weatherIcons from "../assets/weatherIcons";

const WeeklyCard = ({ icon, day, date, min, max }) => {
  return (
    <div className="weekly-card">
      <img src={weatherIcons[icon]} alt="" />
      <div className="weekly-card-text">
        <div className="weekly-card-text-header">
          <h3>{day}</h3>
          <h4>{date}</h4>
        </div>
        <div className="weekly-card-text-details">
          <div className="weekly-card-text-details-min">
            <p>{min}°</p>
            <h4>min</h4>
          </div>
          <div className="weekly-card-text-details-max">
            <p>{max}°</p>
            <h4>max</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

WeeklyCard.propTypes = {
  icon: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

const Weekly = ({ data }) => {
  return (
    <section>
      <h2>This week</h2>
      <div className="weekly-cards">
        <div>
          {data.slice(0, 3).map((hour, index) => (
            <WeeklyCard
              key={index + 3}
              icon={hour.weather_code_icon}
              day={hour.day}
              date={hour.date}
              min={hour.temp_min}
              max={hour.temp_max}
            />
          ))}
        </div>
        <div>
          {data.slice(3).map((hour, index) => (
            <WeeklyCard
              key={index + 3}
              icon={hour.weather_code_icon}
              day={hour.day}
              date={hour.date}
              min={hour.temp_min}
              max={hour.temp_max}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Weekly.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Weekly;
