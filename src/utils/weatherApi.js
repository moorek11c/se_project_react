import { handleResponse } from "./constants";
export const getWeatherData = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(handleResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: data.main.temp,
  };

  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = ({ sunset, sunrise }, now) => {
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);
  if (now > sunriseTime && now < sunsetTime) {
    return true;
  } else {
    return false;
  }
};

const getWeatherType = (temp) => {
  if (temp > 75) {
    return "hot";
  } else if (temp < 40) {
    return "cold";
  } else {
    return "warm";
  }
};
