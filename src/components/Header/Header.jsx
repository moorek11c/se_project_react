import { useContext } from "react";

import "./Header.css";
import logo from "../../assets/images/wtwr°.svg";
import avatar from "../../assets/images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function Header({
  weatherData,
  onAddClothesClick,
  isLoggedIn,
  onSignUpClick,
  onLoginClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const renderUserAvatar = () => {
    if (currentUser && currentUser.avatar) {
      return (
        <img
          className="header__avatar"
          src={currentUser.avatar}
          alt="User Avatar"
        />
      );
    }

    if (currentUser && currentUser.name) {
      const firstLetter = currentUser.name.charAt(0).toUpperCase();
      return <div className="header__avatar-placeholder">{firstLetter}</div>;
    }

    return (
      <img className="header__avatar" src={avatar} alt="Placeholder Avatar" />
    );
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={onAddClothesClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <div className="header__user-container">
            <nav className="header__nav">
              <NavLink className="header__username" to="/profile">
                {currentUser ? currentUser.name : "User"}
              </NavLink>
            </nav>
            {renderUserAvatar()}
          </div>
        </>
      ) : (
        <div className="header__user-container">
          <nav className="header__nav">
            <button
              type="button"
              onClick={onLoginClick}
              className="header__links sign-in__link"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={onSignUpClick}
              className="header__links sign-up__link"
            >
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
