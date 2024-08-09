import React from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext.jsx";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  const filterOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filterOptions[0]?.url;
  const weatherOptionCondition = filterOptions[0]?.condition;

  const temperature =
    currentTemperatureUnit === "F"
      ? `${weatherData.temp.F} F`
      : `${weatherData.temp.C} C`;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temperature}</p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
