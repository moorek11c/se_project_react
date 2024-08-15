import { useEffect, useState } from "react";
import { getWeatherData, filterWeatherData } from "../utils/weatherApi.js";
import { Routes, Route } from "react-router-dom";
import { APIkey, coordinates } from "../utils/constants.js";
import { CurrentTemperatureUnitProvider } from "../components/Contexts/CurrentTemperatureUnitContext";

import "./App.css";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import Footer from "../components/Footer/Footer";
import ItemModal from "../components/ItemModal/ItemModal.jsx";
import AddItemModal from "../components/AddItemModal/AddItemModal.jsx";
import Profile from "../components/Profile/Profile.jsx";
import { getItems, addItem, deleteItem } from "../utils/api";

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

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const onAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([...clothingItems, newItem]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  };

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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
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
                  clothingItems={clothingItems}
                  handleAddItemSubmit={handleAddItemSubmit}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            ></Route>
          </Routes>
          <Footer />
        </div>

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleDeleteItem}
        />
        <AddItemModal
          activeModal={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={handleAddItemSubmit}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
