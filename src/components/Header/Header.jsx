import "./Header.css";
import logo from "../../assets/images/wtwr°.svg";
import avatar from "../../assets/images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ weatherData, onAddClothesClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={onAddClothesClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <nav className="header__nav">
          <Link className="header__username" to="/Profile">
            {" "}
            Ryan Moore{" "}
          </Link>
        </nav>
        <img className="header__avatar" src={avatar} alt="avatar" />
      </div>
    </header>
  );
}
export default Header;
