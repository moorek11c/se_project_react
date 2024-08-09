import React from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../Contexts/CurrentTemperatureUnitContext";
function ToggleSwitch() {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } =
    React.useContext(CurrentTemperatureUnitContext);

  return (
    <label className="toggle__switch">
      <input
        className="toggle__switch-box"
        type="checkbox"
        onChange={setCurrentTemperatureUnit}
        checked={currentTemperatureUnit === "F"}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
