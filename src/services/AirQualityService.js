import Utilities from "../utils/Utilities";

class AirQualityService {
  constructor() {
    this.airQualityApiUrl =
      "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&hourly=us_aqi&domains=cams_global";
    this.rawAirQualityData = null;
    this.currentAirQualityData = null;
    this.utils = new Utilities();
  }

  fetchAirQualityData = async () => {
    try {
      const response = await fetch(this.airQualityApiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.rawAirQualityData = data;

      this.formatCurrentAirQualityData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  formatCurrentAirQualityData = () => {
    let timeIndex = this.rawAirQualityData["hourly"]["time"].indexOf(
      this.utils.getDateTime()
    );

    this.currentAirQualityData = {
      aqi: this.rawAirQualityData["hourly"]["us_aqi"][timeIndex],
      aqiClass: this.utils.classifyAQI(
        this.rawAirQualityData["hourly"]["us_aqi"][timeIndex]
      ),
    };
  };
}

export default AirQualityService;
