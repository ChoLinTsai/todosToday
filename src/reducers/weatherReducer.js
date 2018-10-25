import { FETCH_WEATHER } from "../actions/types";

const initialState = {
  location: "",
  weather: "",
  temp: "",
  pressure: "",
  windSpeed: "",
  humidity: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        location: action.payload.location,
        weather: action.payload.weather,
        temp: action.payload.temp,
        pressure: action.payload.pressure,
        windSpeed: action.payload.windSpeed,
        humidity: action.payload.humidity
      };

    default:
      return state;
  }
};
