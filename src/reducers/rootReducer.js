import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import dateReducer from "./dateReducer";

export default combineReducers({
  weatherData: weatherReducer,
  dateData: dateReducer
});
