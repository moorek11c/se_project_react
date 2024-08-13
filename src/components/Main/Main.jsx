import { useContext } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "../Main/ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../Contexts/CurrentTemperatureUnitContext.jsx";
import { getWeatherType } from "../../utils/weatherApi.js";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const result = { ...weatherData };
  result.type = {
    F: getWeatherType(result.temp.F, "F"),
    C: getWeatherType(result.temp.C, "C"),
  };

  const temperature =
    currentTemperatureUnit === "F" ? result.temp.F : result.temp.C;

  return (
    <main>
      <WeatherCard weatherData={result} />
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
