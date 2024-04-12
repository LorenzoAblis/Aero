import Utilities from "../utils/Utilities";

class AirQualityService {
  constructor() {
    this.rawAirQualityData = null;
    this.currentAirQualityData = null;
    this.utils = new Utilities();
  }

  fetchAirQualityData = async (selectedLocation) => {
    try {
      const latitude = selectedLocation?.lat || 39.8283;
      const longitude = selectedLocation?.long || -98.5795;

      console.log("aqi", selectedLocation?.lat, selectedLocation?.long);

      const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=us_aqi&domains=cams_global`);
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
