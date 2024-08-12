import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";

// Data
import { getWeatherData, filterWeatherData } from "../utils/weatherApi";
import { APIkey, coordinates } from "../utils/constants";

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

  // const [activeModal, setActiveModal] = useState(null);
  // const [selectedCard, setSelectedCard] = useState({});

  // handles the card click

  // handles the add button click

  // const onAddButtonClick = () => {
  //   setActiveModal("add-garment");
  // };

  // closes the modal
  // const closeModalClick = () => {
  //   setActiveModal(null);
  // };

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
          <Header weatherData={weatherData} />
          <Routes>
            <Route path="/" element={<Main weatherData={weatherData} />} />

            <Route path="/Profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
