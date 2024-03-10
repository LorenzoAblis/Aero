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
                return "Low"
            case 3:
            case 4:
            case 5:
                return "Moderate"
            case 6:
            case 7:
                return "High"
            case 8:
            case 9:
            case 10:
            case 11:
                return "Extreme"
            default:
                return "None"
        }
    }

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
        } else if (format === "date") {
            const dayNumber = dateTime.getDate();
            const month = dateTime.toLocaleDateString("en-US", { month: "long" });
            return `${dayNumber} ${month}`;
        }
    };

    convertWeatherCode = (weatherCode, format) => {
        if (format === "text") {
            switch (weatherCode) {
                case 0:
                    return "Clear sky"
                case 1:
                    return "Mainly clear sky"
                case 2:
                    return "Partly cloudy sky"
                case 3:
                    return "Cloudy sky"
                case 45:
                    return "Fog"
                case 48:
                    return "Cold fog"
                case 51:
                    return "Light drizzle"
                case 53:
                    return "Moderate drizzle"
                case 55:
                    return "Heavy drizzle"
                case 56:
                    return "Light freezing drizzle"
                case 57:
                    return "Heavy freezing drizzle"
                case 61:
                    return "Slight rain"
                case 63:
                    return "Moderate rain"
                case 65:
                    return "Heavy rain"
                case 66:
                    return "Light freezing rain"
                case 67:
                    return "Heavy freezing rain"
                case 71:
                    return "Slight snow fall"
                case 73:
                    return "Moderate snow fall"
                case 75:
                    return "Heavy snow fall"
                case 77:
                    return "Snow grains"
                case 80:
                    return "Slight rain showers"
                case 81:
                    return "Moderate rain showers"
                case 82:
                    return "Heavy rain showers"
                case 85:
                    return "Slight snow showers"
                case 86:
                    return "Heavy snow showers"
                case 95:
                    return "Thunderstorm"
                default:
                    return "Unknown"
            }
        } else {
            switch (weatherCode) {
                case 0:
                    return "bi bi-brightness-high-fill"
                case 1:
                case 2:
                    return "bi bi-cloud-sun-fill"
                case 3:
                    return "bi bi-cloud-fill"
                case 45:
                case 48:
                    return "bi bi-cloud-fog-fill"
                case 51:
                case 53:
                case 55:
                case 56:
                case 57:
                    return "bi bi-cloud-drizzle-fill"
                case 61:
                case 63:
                case 65:
                case 66:
                case 67:
                    return "bi bi-cloud-rain-heavy-fill"
                case 71:
                case 73:
                case 75:
                case 77:
                    return "bi bi-cloud-snow-fill"
                case 80:
                    return "bi bi-cloud-rain-fill"
                case 81:
                case 82:
                    return "bi bi-cloud-rain-fill"
                case 85:
                case 86:
                    return "bi bi-cloud-snow-fill"
                case 95:
                    return "bi bi-cloud-lightning-rain-fill"
                default:
                    return "bi bi-question-lg"
            }
        }
    }
}

export default Utilities;