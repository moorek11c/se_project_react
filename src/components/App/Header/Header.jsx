import "./Header.css";
import logo from "../../../assets/wtwr°.svg";
import avatar from "../../../assets/avatar.svg";
function Header({ onAddButtonClick, weatherData }) {
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
      <button
        onClick={onAddButtonClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Ryan Moore</p>
        <img className="header__avatar" src={avatar} alt="avatar" />
      </div>
    </header>
  );
}

export default Header;
