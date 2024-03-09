import PropTypes from "prop-types";
import "../styles/Weekly.scss";

const WeeklyCard = ({ icon, day, date, min, max }) => {
  return (
    <div className="weekly-card">
      <i className={icon}></i>
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
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
};

const Weekly = () => {
  return (
    <section>
      <h2>This week</h2>
      <div className="weekly-cards">
        <div>
          <WeeklyCard
            icon="bi bi-cloud-fill"
            day="FRI"
            date="29 JULY"
            min="24"
            max="34"
          />
          <WeeklyCard
            icon="bi bi-cloud-fill"
            day="FRI"
            date="29 JULY"
            min="24"
            max="34"
          />
          <WeeklyCard
            icon="bi bi-cloud-fill"
            day="FRI"
            date="29 JULY"
            min="24"
            max="34"
          />
        </div>
        <div>
          <WeeklyCard
            icon="bi bi-cloud-fill"
            day="FRI"
            date="29 JULY"
            min="24"
            max="34"
          />
          <WeeklyCard
            icon="bi bi-cloud-fill"
            day="FRI"
            date="29 JULY"
            min="24"
            max="34"
          />
          <WeeklyCard
            icon="bi bi-cloud-fill"
            day="FRI"
            date="29 JULY"
            min="24"
            max="34"
          />
        </div>
      </div>
    </section>
  );
};

export default Weekly;
