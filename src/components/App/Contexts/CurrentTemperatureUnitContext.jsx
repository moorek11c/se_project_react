import React, { useState } from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "F",
  handletoggleSwitchChange: () => {},
});

export const CurrentTemperatureUnitProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const toggleTemperatureUnit = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        setCurrentTemperatureUnit: toggleTemperatureUnit,
      }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};

export default CurrentTemperatureUnitContext;
