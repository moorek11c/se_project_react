import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import Profile from "./Profile/Profile";
import ItemModal from "./ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitProvider } from "./Contexts/CurrentTemperatureUnitContext";
// import CurrentTemperatureUnitContext from "./Contexts/CurrentTemperatureUnitContext";
/****************************
 * sets the weather data *
 ****************************/

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true || false,
  });

  // sets the active modal

  const [activeModal, setActiveModal] = useState("");

  // sets the selected card

  const [selectedCard, setSelectedCard] = useState({});

  // handles the card click

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // handles the add button click

  const onAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  // closes the modal
  const closeModalClick = () => {
    setActiveModal("");
  };

  // gets the weather data from the API and filters it

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentTemperatureUnitProvider>
      <div className="page">
        <div className="page__wrapper">
          <Header
            onAddButtonClick={onAddButtonClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />

            <Route path="/Profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpened={activeModal === "add-garment"}
          closeModalClick={closeModalClick}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                id="hot"
                className="modal__radio-input"
                name="weather"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                id="warm"
                className="modal__radio-input"
                name="weather"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                id="cold"
                className="modal__radio-input"
                name="weather"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activModal={activeModal}
          card={selectedCard}
          closeModalClick={closeModalClick}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
