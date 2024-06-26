import PropTypes from "prop-types";
import "../styles/Weekly.scss";
import * as weatherIcons from "../assets/weatherIcons";

const WeeklyCard = ({
  icon,
  date,
  min,
  max,
  day,
  setSelectedDay,
  setShowDayView,
}) => {
  const handleClick = () => {
    setSelectedDay(day);
    setShowDayView(true);
  };
  return (
    <div className="weekly-card" onClick={handleClick}>
      <img src={weatherIcons[icon]} alt="" />

      <div className="weekly-card-text">
        <div className="weekly-card-text-header">
          <h3>{day.day}</h3>
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
  date: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  day: PropTypes.object,
  setSelectedDay: PropTypes.func.isRequired,
  setShowDayView: PropTypes.func.isRequired,
};

const Weekly = ({ data, selectedDay, setSelectedDay, setShowDayView }) => {
  return (
    <section>
      <h2>This week</h2>
      <div className="weekly-cards">
        {data.map((hour, index) => (
          <WeeklyCard
            key={index}
            icon={hour.weather_code_icon}
            date={hour.date}
            min={hour.temp_min}
            max={hour.temp_max}
            day={hour}
            setSelectedDay={setSelectedDay}
            setShowDayView={setShowDayView}
          />
        ))}
      </div>
    </section>
  );
};

Weekly.propTypes = {
  data: PropTypes.array.isRequired,
  selectedDay: PropTypes.object,
  setSelectedDay: PropTypes.func.isRequired,
  setShowDayView: PropTypes.func.isRequired,
};

export default Weekly;
