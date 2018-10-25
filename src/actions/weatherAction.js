import { FETCH_WEATHER } from "./types";
import axios from "axios";

const API_URL_ID = "https://api.openweathermap.org/data/2.5/weather?id=";
const API_CITY_ID = "1668341";
const API_KEY = `&APPID=${myAPI}`;

export const fetchWeather = () => dispatch => {
  axios.get(`${API_URL_ID}${API_CITY_ID}${API_KEY}`).then(result => {
    dispatch({
      type: FETCH_WEATHER,
      payload: {
        location: result.data.name,
        weather: result.data.weather[0].main,
        temp: (result.data.main.temp - 273).toFixed(1),
        pressure: `Pressure : ${result.data.main.pressure}`,
        windSpeed: `Wind Speed : ${result.data.wind.speed} m/s`,
        humidity: `Humidity : ${result.data.main.humidity}%`
      }
    });
  });
};
