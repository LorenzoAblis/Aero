import Utilities from "../utils/Utilities";

class WeatherService {
  constructor() {
    this.rawWeatherData = null;
    this.currentWeatherData = null;
    this.hourlyWeatherData = [];
    this.weeklyWeatherData = [];
    this.utils = new Utilities();
  }

  fetchWeatherData = async (selectedLocation, units) => {
    try {
      let latitude = selectedLocation?.lat;
      let longitude = selectedLocation?.long;

      let temp = units.temp;
      let wind = units.wind;
      let week = (Number(units.week) || 7) + 1;

      let apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&temperature_unit=${temp}&wind_speed_unit=${wind}&precipitation_unit=inch&timezone=auto&forecast_days=${
        week || 7
      }`;

      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.rawWeatherData = data;

      this.formatWeeklyWeatherData();
      this.formatHourlyWeatherData(units.hour);
      this.formatCurrentWeatherData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  formatWeeklyWeatherData = () => {
    this.weeklyWeatherData = [];
    let minIndex = 1;
    let maxIndex = minIndex + 15;

    while (
      minIndex <= maxIndex &&
      minIndex < this.rawWeatherData["daily"]["time"].length
    ) {
      const DayData = {
        day: this.utils.convertTimeFormat(
          this.rawWeatherData["daily"]["time"][minIndex],
          "day"
        ),
        dayLong: this.utils.convertTimeFormat(
          this.rawWeatherData["daily"]["time"][minIndex],
          "dayLong"
        ),
        date: this.utils.convertTimeFormat(
          this.rawWeatherData["daily"]["time"][minIndex],
          "date"
        ),
        temp_min: Math.round(
          this.rawWeatherData["daily"]["temperature_2m_min"][minIndex]
        ),
        temp_max: Math.round(
          this.rawWeatherData["daily"]["temperature_2m_max"][minIndex]
        ),
        weather_code_icon: this.utils.convertWeatherCode(
          this.rawWeatherData["daily"]["weather_code"][minIndex],
          "logo"
        ),
        feelslike_min: Math.round(
          this.rawWeatherData["daily"]["apparent_temperature_min"][minIndex]
        ),
        feelslike_max: Math.round(
          this.rawWeatherData["daily"]["apparent_temperature_max"][minIndex]
        ),
        sunrise: this.utils.convertTimeFormat(
          this.rawWeatherData["daily"]["sunrise"][minIndex],
          "hh:mm:a"
        ),
        sunset: this.utils.convertTimeFormat(
          this.rawWeatherData["daily"]["sunset"][minIndex],
          "hh:mm:a"
        ),
        uv: this.rawWeatherData["daily"]["uv_index_max"][minIndex],
        uvClass: this.utils.getUvClass(
          this.rawWeatherData["daily"]["uv_index_max"][minIndex]
        ),
        wind_speed: Math.round(
          this.rawWeatherData["daily"]["wind_speed_10m_max"][minIndex]
        ),
        wind_gusts: Math.round(
          this.rawWeatherData["daily"]["wind_gusts_10m_max"][minIndex]
        ),
        wind_direction: this.utils.degreesToDirection(
          this.rawWeatherData["daily"]["wind_direction_10m_dominant"][minIndex]
        ),
        precip:
          this.rawWeatherData["daily"]["precipitation_probability_max"][
            minIndex
          ],
      };

      this.weeklyWeatherData.push(DayData);
      minIndex += 1;
    }
  };

  formatHourlyWeatherData = (hour) => {
    this.hourlyWeatherData = [];
    let minIndex =
      this.rawWeatherData["hourly"]["time"].indexOf(this.utils.getDateTime()) +
      1;
    let maxIndex = minIndex + (Number(hour) - 1 || 8);

    while (
      minIndex <= maxIndex &&
      minIndex < this.rawWeatherData["hourly"]["time"].length
    ) {
      const HourData = {
        time: this.utils.convertTimeFormat(
          this.rawWeatherData["hourly"]["time"][minIndex],
          "hh:a"
        ),
        weather_code_icon: this.utils.convertWeatherCode(
          this.rawWeatherData["hourly"]["weather_code"][minIndex],
          "icon",
          parseInt(
            this.rawWeatherData["hourly"]["time"][minIndex]
              .split("T")[1]
              .split(":")[0]
          ),
          this.utils.convertTimeFormat(
            this.rawWeatherData["daily"]["sunrise"][0],
            "24-hour"
          ),
          this.utils.convertTimeFormat(
            this.rawWeatherData["daily"]["sunset"][0],
            "24-hour"
          )
        ),
        temp: Math.round(
          this.rawWeatherData["hourly"]["temperature_2m"][minIndex]
        ),
        humidity:
          this.rawWeatherData["hourly"]["relative_humidity_2m"][minIndex],
        feelslike: Math.round(
          this.rawWeatherData["hourly"]["apparent_temperature"][minIndex]
        ),
        precip:
          this.rawWeatherData["hourly"]["precipitation_probability"][minIndex],
        pressure: Math.round(
          this.rawWeatherData["hourly"]["surface_pressure"][minIndex]
        ),
        wind_speed: Math.round(
          this.rawWeatherData["hourly"]["wind_speed_10m"][minIndex]
        ),
        wind_direction: this.utils.degreesToDirection(
          this.rawWeatherData["hourly"]["wind_direction_10m"][minIndex]
        ),
        uv_index: this.rawWeatherData["hourly"]["uv_index"][minIndex],
        uv_class: this.utils.getUvClass(
          this.rawWeatherData["hourly"]["uv_index"][minIndex]
        ),
      };

      this.hourlyWeatherData.push(HourData);
      minIndex += 1;
    }
  };

  formatCurrentWeatherData = () => {
    let timeIndex = this.rawWeatherData["hourly"]["time"].indexOf(
      this.utils.getDateTime()
    );

    this.currentWeatherData = {
      temp: Math.round(
        this.rawWeatherData["hourly"]["temperature_2m"][timeIndex]
      ),
      humidity:
        this.rawWeatherData["hourly"]["relative_humidity_2m"][timeIndex],
      feelslike: Math.round(
        this.rawWeatherData["hourly"]["apparent_temperature"][timeIndex]
      ),
      precip:
        this.rawWeatherData["hourly"]["precipitation_probability"][timeIndex],
      pressure: Math.round(
        this.rawWeatherData["hourly"]["surface_pressure"][timeIndex]
      ),
      wind_speed: Math.round(
        this.rawWeatherData["hourly"]["wind_speed_10m"][timeIndex]
      ),
      wind_direction: this.utils.degreesToDirection(
        this.rawWeatherData["hourly"]["wind_direction_10m"][timeIndex]
      ),
      temp_max: Math.round(
        this.rawWeatherData["daily"]["temperature_2m_max"][0]
      ),
      temp_min: Math.round(
        this.rawWeatherData["daily"]["temperature_2m_min"][0]
      ),
      sunrise: this.utils.convertTimeFormat(
        this.rawWeatherData["daily"]["sunrise"][0],
        "hh:mm:a"
      ),
      sunset: this.utils.convertTimeFormat(
        this.rawWeatherData["daily"]["sunset"][0],
        "hh:mm:a"
      ),
      uv: this.rawWeatherData["daily"]["uv_index_max"][0],
      uvClass: this.utils.getUvClass(
        this.rawWeatherData["daily"]["uv_index_max"][0]
      ),
      weather_code: this.utils.convertWeatherCode(
        this.rawWeatherData["daily"]["weather_code"][0],
        "text"
      ),
      weather_code_icon: this.utils.convertWeatherCode(
        this.rawWeatherData["daily"]["weather_code"][0],
        "icon"
      ),
    };
  };
}

export default WeatherService;
