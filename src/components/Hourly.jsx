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

const Hourly = () => {
  return (
    <section>
      <h2>Hourly</h2>
      <div className="hourly-cards">
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
        <HourlyCard time="8 AM" icon="bi bi-brightness-high-fill" value="26°" />
      </div>
    </section>
  );
};

export default Hourly;
