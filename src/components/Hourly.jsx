import PropTypes from "prop-types";
import "../styles/Hourly.scss";

const HourlyCard = ({ time, icon, value }) => {
  return (
    <div className="hourly-card">
      <h3>{time}</h3>
      <i className={icon}></i>
      <p>{value}</p>
    </div>
  );
};

HourlyCard.propTypes = {
  time: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Hourly = ({ data }) => {
  return (
    <section>
      <h2>Hourly</h2>
      <div className="hourly-cards">
        {data.map((hour, index) => (
          <HourlyCard
            key={index}
            time={hour.time}
            icon={hour.weather_code_icon}
            value={`${hour.temp}°`}
          />
        ))}
      </div>
    </section>
  );
};

Hourly.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Hourly;
