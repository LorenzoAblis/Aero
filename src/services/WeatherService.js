import Utilities from "../utils/Utilities";

class WeatherService {
  constructor() {
    this.rawWeatherData = null;
    this.currentWeatherData = null;
    this.hourlyWeatherData = [];
    this.weeklyWeatherData = [];
    this.utils = new Utilities();
  }

  fetchWeatherData = async (selectedLocation) => {
    try {
      let latitude = selectedLocation?.lat;
      let longitude = selectedLocation?.long;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.rawWeatherData = data;

      this.formatWeeklyWeatherData();
      this.formatHourlyWeatherData();
      this.formatCurrentWeatherData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  formatWeeklyWeatherData = () => {
    this.weeklyWeatherData = [];
    let minIndex = 1;
    let maxIndex = minIndex + 5;

    while (
      minIndex <= maxIndex &&
      minIndex < this.rawWeatherData["daily"]["time"].length
    ) {
      const DayData = {
        day: this.utils.convertTimeFormat(
          this.rawWeatherData["daily"]["time"][minIndex],
          "day"
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
      };

      this.weeklyWeatherData.push(DayData);
      minIndex += 1;
    }
  };

  formatHourlyWeatherData = () => {
    this.hourlyWeatherData = [];
    let minIndex =
      this.rawWeatherData["hourly"]["time"].indexOf(this.utils.getDateTime()) +
      1;
    let maxIndex = minIndex + 7;

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
          "icon"
        ),
        temp: Math.round(
          this.rawWeatherData["hourly"]["temperature_2m"][minIndex]
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
