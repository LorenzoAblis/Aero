import PropTypes from "prop-types";
import "../styles/Current.scss";

const ConditionCard = ({ icon, title, value, color }) => {
  return (
    <div className="conditions-card" style={{ color: `${color}` }}>
      <i className={icon}></i>
      <div className="conditions-card-text">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

ConditionCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const Current = () => {
  return (
    <section>
      <div className="temp">
        <div className="temp-real">
          <i className="bi bi-sun-fill temp-icon"></i>
          <div className="temp-text">
            <h1>26°</h1>
            <p>Clear skies, possible cyclones</p>
          </div>
        </div>
        <div className="temp-additional">
          <div className="temp-minmax">
            <div className="temp-min">
              <i className="bi bi-arrow-down-short"></i>
              <div className="temp-min-text">
                <h3>Min</h3>
                <p>23°</p>
              </div>
            </div>
            <div className="temp-max">
              <i className="bi bi-arrow-up-short"></i>
              <div className="temp-max-text">
                <h3>Max</h3>
                <p>30°</p>
              </div>
            </div>
          </div>
          <p className="temp-feelslike">Feels like 25°</p>
        </div>
      </div>

      <div className="conditions">
        <div>
          <ConditionCard
            icon="bi bi-cloud-drizzle-fill"
            title="Chance of rain"
            value="14%"
            color="lightblue"
          />
          <ConditionCard
            icon="bi bi-arrow-up-left-circle-fill"
            title="Wind"
            value="311 km/h"
            color="lightgray"
          />
          <ConditionCard
            icon="bi bi-sunrise-fill"
            title="Sunrise"
            value="5:47 PM"
            color="orange"
          />
          <ConditionCard
            icon="bi bi-sunset-fill"
            title="Sunset"
            value="8:16 AM"
            color="purple"
          />
        </div>
        <div>
          <ConditionCard
            icon="bi bi-brightness-low-fill"
            title="UV Index"
            value="1.2"
            color="pink"
          />
          <ConditionCard
            icon="bi bi-graph-up-arrow"
            title="Pressure"
            value="952 hPa"
            color="magenta"
          />
          <ConditionCard
            icon="bi bi-droplet-fill"
            title="Humidity"
            value="98%"
            color="lightblue"
          />
          <ConditionCard
            icon="bi bi-wind"
            title="Air Quality"
            value="43"
            color="lightgreen"
          />
        </div>
      </div>
    </section>
  );
};

export default Current;
