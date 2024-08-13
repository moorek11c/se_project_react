import { useEffect, useState } from "react";
import { getWeatherData, filterWeatherData } from "../utils/weatherApi.js";
import { Routes, Route } from "react-router-dom";
import { APIkey, coordinates } from "../utils/constants.js";
import "./App.css";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import Footer from "../components/Footer/Footer";
import ItemModal from "../components/ItemModal/ItemModal.jsx";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm.jsx";
import Profile from "../components/Profile/Profile.jsx";

// Data

// contexts
import { CurrentTemperatureUnitProvider } from "../components/Contexts/CurrentTemperatureUnitContext";

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
  const [selectedCard, setSelectedCard] = useState({});

  const onAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // closes the modal
  const closeActiveModal = () => {
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
            weatherData={weatherData}
            onAddClothesClick={onAddClothesClick}
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
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
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
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
