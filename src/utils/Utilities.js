class Utilities {
  getDateTime = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:00`;
  };

  getUvClass = (uv) => {
    switch (Math.round(uv)) {
      case 1:
      case 2:
        return "Low";
      case 3:
      case 4:
      case 5:
        return "Moderate";
      case 6:
      case 7:
        return "High";
      case 8:
      case 9:
      case 10:
      case 11:
        return "Extreme";
      default:
        return "None";
    }
  };

  degreesToDirection = (degrees) => {
    degrees = (degrees + 360) % 360;

    let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    let index = Math.round(degrees / 45) % 8;

    return directions[index];
  };

  convertTimeFormat = (timeString, format) => {
    const dateTime = new Date(timeString);

    if (format === "hh:mm:a") {
      return dateTime.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (format === "hh:a") {
      return dateTime.toLocaleTimeString([], {
        hour: "numeric",
        hour12: true,
      });
    } else if (format === "day") {
      return dateTime.toLocaleDateString("en-US", { weekday: "short" });
    } else if (format === "dayLong") {
      return dateTime.toLocaleDateString("en-US", { weekday: "long" });
    } else if (format === "24-hour") {
      return dateTime.getHours();
    } else if (format === "date") {
      const dayNumber = dateTime.getDate();
      const month = dateTime.toLocaleDateString("en-US", { month: "long" });
      return `${dayNumber} ${month}`;
    }
  };

  classifyAQI = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return "Good";
    } else if (aqi >= 51 && aqi <= 100) {
      return "Moderate";
    } else if (aqi >= 101 && aqi <= 150) {
      return "Unhealthy for Sensitive Groups";
    } else if (aqi >= 151 && aqi <= 200) {
      return "Unhealthy";
    } else if (aqi >= 201 && aqi <= 300) {
      return "Very Unhealthy";
    } else if (aqi >= 301 && aqi <= 500) {
      return "Hazardous";
    } else {
      return "Invalid AQI value";
    }
  };

  convertWeatherCode = (weatherCode, format, hour, sunrise, sunset) => {
    const icons = {
      0: "clear",
      1: "partlyCloudy",
      2: "partlyCloudy",
      3: "cloudy",
      45: "fog",
      48: "fog",
      51: "drizzle",
      53: "drizzle",
      55: "drizzle",
      56: "sleet",
      57: "sleet",
      61: "rain",
      63: "rain",
      65: "rain",
      66: "sleet",
      67: "sleet",
      71: "snow",
      73: "snow",
      75: "snow",
      77: "snow",
      80: "drizzle",
      81: "drizzle",
      82: "sleet",
      85: "sleet",
      86: "sleet",
      95: "thunderstorms",
    };

    const textDescriptions = {
      0: "Clear sky",
      1: "Mainly clear sky",
      2: "Partly cloudy sky",
      3: "Cloudy sky",
      45: "Fog",
      48: "Cold fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Heavy drizzle",
      56: "Light freezing drizzle",
      57: "Heavy freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Heavy rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
    };

    const isNight = hour >= sunset || hour < sunrise;

    if (format === "text") {
      return textDescriptions[weatherCode] || "Unknown";
    } else {
      return (
        `${icons[weatherCode]}${isNight ? "Night" : "Day"}` ||
        "bi bi-question-lg"
      );
    }
  };
}

export default Utilities;
