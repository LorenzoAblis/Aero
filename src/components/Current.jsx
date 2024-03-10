import PropTypes from "prop-types";
import "../styles/Current.scss";
import * as weatherIcons from "../assets/weatherIcons";

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

const Current = ({ weatherData, airQualityData }) => {
  return (
    <section className="current-section">
      <div className="temp">
        <div className="temp-real">
          <img src={weatherIcons[weatherData.weather_code_icon]} alt="" />
          <div className="temp-text">
            <h1>{weatherData.temp}°</h1>
            <p>{weatherData.weather_code}</p>
          </div>
        </div>
        <div className="temp-additional">
          <div className="temp-minmax">
            <div className="temp-min">
              <i className="bi bi-arrow-down-short"></i>
              <div className="temp-min-text">
                <h3>Min</h3>
                <p>{weatherData.temp_min}°</p>
              </div>
            </div>
            <div className="temp-max">
              <i className="bi bi-arrow-up-short"></i>
              <div className="temp-max-text">
                <h3>Max</h3>
                <p>{weatherData.temp_max}°</p>
              </div>
            </div>
          </div>
          <p className="temp-feelslike">Feels like {weatherData.feelslike}°</p>
        </div>
      </div>

      <div className="conditions">
        <div>
          <ConditionCard
            icon="bi bi-cloud-drizzle-fill"
            title="Chance of rain"
            value={`${weatherData.precip}%`}
            color="lightblue"
          />
          <ConditionCard
            icon="bi bi-arrow-up-left-circle-fill"
            title="Wind"
            value={`${weatherData.wind_speed} mph ${weatherData.wind_direction}`}
            color="lightgray"
          />
          <ConditionCard
            icon="bi bi-sunrise-fill"
            title="Sunrise"
            value={weatherData.sunrise}
            color="orange"
          />
          <ConditionCard
            icon="bi bi-sunset-fill"
            title="Sunset"
            value={weatherData.sunset}
            color="purple"
          />
        </div>
        <div>
          <ConditionCard
            icon="bi bi-brightness-low-fill"
            title="UV Index"
            value={`${weatherData.uv} (${weatherData.uvClass})`}
            color="pink"
          />
          <ConditionCard
            icon="bi bi-graph-up-arrow"
            title="Pressure"
            value={`${weatherData.pressure} hPa`}
            color="magenta"
          />
          <ConditionCard
            icon="bi bi-droplet-fill"
            title="Humidity"
            value={`${weatherData.humidity}%`}
            color="lightblue"
          />
          <ConditionCard
            icon="bi bi-wind"
            title="Air Quality"
            value={`${airQualityData.aqi} (${airQualityData.aqiClass})`}
            color="lightgreen"
            // TODO: Get air quality
          />
        </div>
      </div>
    </section>
  );
};

Current.propTypes = {
  weatherData: PropTypes.object.isRequired,
  airQualityData: PropTypes.object.isRequired,
};

export default Current;
