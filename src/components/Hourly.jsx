import PropTypes from "prop-types";
import "../styles/Hourly.scss";
import * as weatherIcons from "../assets/weatherIcons";

const HourlyCard = ({ hour, setShowHourView, setSelectedHour }) => {
  const handleClick = () => {
    setSelectedHour(hour);
    setShowHourView(true);
  };

  return (
    <div className="hourly-card" onClick={handleClick}>
      <h3>{hour.time}</h3>
      <img src={weatherIcons[hour.weather_code_icon]} alt="" />
      <p>{`${hour.temp}°`}</p>
    </div>
  );
};

HourlyCard.propTypes = {
  hour: PropTypes.object.isRequired,
  setShowHourView: PropTypes.func.isRequired,
  setSelectedHour: PropTypes.func.isRequired,
};

const Hourly = ({ data, setShowHourView, setSelectedHour }) => {
  return (
    <section>
      <h2>Hourly</h2>
      <div className="hourly-cards">
        {data.map((hour, index) => (
          <HourlyCard
            key={index}
            hour={hour}
            setShowHourView={setShowHourView}
            setSelectedHour={setSelectedHour}
          />
        ))}
      </div>
    </section>
  );
};

Hourly.propTypes = {
  data: PropTypes.array.isRequired,
  setShowHourView: PropTypes.func.isRequired,
  setSelectedHour: PropTypes.func.isRequired,
};

export default Hourly;
