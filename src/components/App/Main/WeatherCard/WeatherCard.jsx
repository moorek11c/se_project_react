import "./WeatherCard.css";
import { weatherOptions } from "../../../../utils/constants";
function WeatherCard({ weatherData }) {
  const filterOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption = filterOptions[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}</p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
