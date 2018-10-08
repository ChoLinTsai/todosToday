import React, { Component } from 'react'
import './content.scss';

export default class Content extends Component {
  render() {
    return (
      <div className="weatherContent">
        <div className="leftPanel">
          <p className="city">台北</p>
          <p className="weather">多雲</p>
          <p className="temp">23<span>&deg;</span>c</p>
        </div>
        <div className="rightPanel">
          <p className="windDir">風向 : 東北</p>
          <p className="windPower">風力 : 7級</p>
          <p className="moisture">濕度 : 60%</p>
        </div>
      </div>
    )
  }
}
