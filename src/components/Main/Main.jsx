import React from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "../Main/ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../Contexts/CurrentTemperatureUnitContext.jsx";
import { getWeatherType } from "../../utils/weatherApi.js";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  // gets the current temperature based on the current temperature unit

  const temperature =
    currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  const result = weatherData;
  result.type = {
    F: getWeatherType(result.temp.F, "F"),
    C: getWeatherType(result.temp.C, "C"),
  };

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature}°{currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === result.type[currentTemperatureUnit];
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
