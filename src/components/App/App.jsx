// React Imports
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { APIkey, coordinates } from "../../utils/constants.js";

// Contexts
import { CurrentTemperatureUnitProvider } from "../../Contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../Contexts/CurrentUserContext.jsx";

// Component Imports
import "./App.css";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../Modals/ItemModal/ItemModal.jsx";
import AddItemModal from "../Modals/AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes.jsx";
import SignUpModal from "../Modals/SignUpModal/RegisterModal.jsx";
import LoginModal from "../Modals/LoginModal/LoginModal.jsx";
import * as auth from "../../utils/auth.js";
import EditProfileModal from "../Modals/EditProfileModal/EditProfileModal.jsx";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true || false,
  });

  // State for the active modal
  const [activeModal, setActiveModal] = useState("");

  // State for the selected card
  const [selectedCard, setSelectedCard] = useState({});

  // State for the clothing items
  const [clothingItems, setClothingItems] = useState([]);

  // State for the current user
  const [currentUser, setCurrentUser] = useState(null);

  // Navigate to a different page
  const navigate = useNavigate();

  // state to check if User is Logged In

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // handleProfileChange
  const handleProfileChange = (updatedUser) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedUser, // Update only the fields that have changed
    }));
  };

  // validate token on page load
  // checkToken is called from the auth.js file
  // checkToken successfully returns the data in then()
  // setCurrentUser is called with the data and the currentUser state is set
  // setIsLoggedIn is set to true

  useEffect(() => {
    const validateToken = async () => {
      try {
        const data = await auth.checkToken();
        setCurrentUser(data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
      }
    };

    validateToken();
  }, []);

  // Logging in
  // first check if email and password are provided
  // if not, log an error
  // try to authorize the user with the email and password
  // if the data.token exists, save the token to localStorage
  // if the data.user exists and is a valid user object, set the currentUser
  // if the user data is incomplete or missing, set the currentUser to null and log a warning
  // set isLoggedIn to true and close the active modal
  // navigate to the profile page

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }
    try {
      const data = await auth.authorize(email, password);

      if (data.token) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);

        // Ensure data.user exists and is a valid user object
        const user = data.user || null;
        if (user && user.name) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }

        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // handle Logging Out
  // remove the token from localStorage
  // set the currentUser to null
  // set isLoggedIn to false
  // navigate to the main page
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  /**********
   * Modals *
   **********/

  // Add clothes modal
  const onAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  // Card click handler
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // sign up modal
  const onSignUpClick = () => {
    setActiveModal("sign-up");
  };

  // login modal
  const onLoginClick = () => {
    setActiveModal("login");
  };

  // edit profile modal
  const onEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  // Close the active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // handleRegistrationSuccess

  const handleRegistrationSuccess = (values) => {
    setCurrentUser(values);
    setIsLoggedIn(true);

    closeActiveModal();
  };

  // Add a new item to the profile page and the database
  // addItem is called from the api.js file
  // addItem successfully returns the data in then()
  // setClothingItems is called with the data and the clothingItems state is set

  const handleAddItemSubmit = (item) => {
    return addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  // delete a card from the profile page and the database by id
  // deleteItem is called from the api.js file
  // deleteItem successfully returns the data in then()
  // setClothingItems is called with the data and the clothingItems state is set

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Close the modal when the user presses the escape key
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // Fetch the weatherdata on page load (useEffect)
  //getWeatherData with the coordinates and APIkey from constants.js
  // getWeatherData successfully returns the data in then()
  // filterWeatherData is called with the data and the filtered data is set to the state

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

  // Fetch the clothing items on page load (useEffect)
  // getItems is called from the api.js file
  // getItems successfully returns the data in then()
  // setClothingItems is called with the data and the clothingItems state is set

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const action = isLiked ? removeCardLike : addCardLike;

    action(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <CurrentTemperatureUnitProvider>
        <div className="page">
          <div className="page__wrapper">
            <Header
              weatherData={weatherData}
              onAddClothesClick={onAddClothesClick}
              onSignUpClick={onSignUpClick}
              onLoginClick={onLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddItemSubmit={handleAddItemSubmit}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClothesClick={onAddClothesClick}
                      onEditProfileClick={onEditProfileClick}
                      onLogout={handleLogout}
                      isLoggedIn={isLoggedIn}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
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
            onSubmit={handleAddItemSubmit}
          />
          <SignUpModal
            activeModal={activeModal === "sign-up"}
            onClose={closeActiveModal}
            onSubmit={handleRegistrationSuccess}
            openLogin={onLoginClick}
          />
          <LoginModal
            activeModal={activeModal === "login"}
            onClose={closeActiveModal}
            onSubmit={handleLogin}
            openSignup={onSignUpClick}
          />
          <EditProfileModal
            activeModal={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            currentUser={currentUser}
            onSubmit={handleProfileChange}
          />
        </div>
      </CurrentTemperatureUnitProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
