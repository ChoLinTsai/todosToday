import React, { Component } from "react";
import "./content.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchWeather } from "../../actions/weatherAction";

class Content extends Component {
  componentDidMount() {
    this.props.fetchWeather();
  }

  render() {
    const {
      location,
      weather,
      temp,
      pressure,
      windSpeed,
      humidity
    } = this.props.weatherData;

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

Content.propTypes = {
  fetchWeather: PropTypes.func.isRequired,
  weatherData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weatherData: state.weatherData
});

export default connect(
  mapStateToProps,
  { fetchWeather }
)(Content);
