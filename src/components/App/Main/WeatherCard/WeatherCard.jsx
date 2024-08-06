import "./WeatherCard.css";
import { weatherOptions } from "../../../../utils/constants.js";
function WeatherCard({ weatherData }) {
  const filterOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filterOptions[0]?.url;
  const weatherOptionCondition = filterOptions[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}</p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
