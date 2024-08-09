import { handleResponse } from "./constants";
export const getWeatherData = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(handleResponse);
};

/**********************************
 * ////////////////////////////// *
 **********************************/

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };

  result.type = {
    F: getWeatherType(result.temp.F, "F"),
    C: getWeatherType(result.temp.C, "C"),
  };
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  console.log("Filtered Weather Data:", result); // Add this line

  return result;
};

// gets the weather data from the API and filters it

/************************************
 * //////////////////////////////// *
 ************************************/

const isDay = ({ sunset, sunrise }, now) => {
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);
  if (now > sunriseTime && now < sunsetTime) {
    return true;
  } else {
    return false;
  }
};

// returns true if it is daytime, false if it is nighttime

/*******************************************
 * /////////////////////////////////////// *
 *******************************************/

export const getWeatherType = (temp, unit) => {
  if (unit === "F") {
    if (temp > 75) {
      return "hot";
    } else if (temp < 40) {
      return "cold";
    } else {
      return "warm";
    }
  } else if (unit === "C") {
    if (temp > 24) {
      return "hot";
    } else if (temp < 4) {
      return "cold";
    } else {
      return "warm";
    }
  }

  // returns the type of weather based on the temperature
};
