import React, { Component } from "react";
import "./content.scss";
import axios from "axios";

const API_URL_ID = "https://api.openweathermap.org/data/2.5/weather?id=";
const API_CITY_ID = "1668341";
const API_KEY = `&APPID=${myAPI}`;

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      weather: "",
      temp: "",
      pressure: "",
      windSpeed: "",
      humidity: ""
    };
  }

  componentDidMount() {
    axios.get(`${API_URL_ID}${API_CITY_ID}${API_KEY}`).then(result => {
      this.setState({
        location: result.data.name,
        weather: result.data.weather[0].main,
        temp: (result.data.main.temp - 273).toFixed(1),
        pressure: `Pressure : ${result.data.main.pressure}`,
        windSpeed: `Wind Speed : ${result.data.wind.speed} m/s`,
        humidity: `Humidity : ${result.data.main.humidity}%`
      });
    });
  }

  render() {
    const location = this.state.location;
    const weather = this.state.weather;
    const temp = this.state.temp;
    const pressure = this.state.pressure;
    const windSpeed = this.state.windSpeed;
    const humidity = this.state.humidity;

    return (
      <div className="weatherContent">
        <div className="leftPanel">
          <p className="city">{location}</p>
          <p className="weather">{weather}</p>
          <p className="temp">
            {temp}
            <span>&deg;</span>c
          </p>
        </div>
        <div className="rightPanel">
          <p className="windDir">{pressure}</p>
          <p className="windPower">{windSpeed}</p>
          <p className="moisture">{humidity}</p>
        </div>
      </div>
    );
  }
}
