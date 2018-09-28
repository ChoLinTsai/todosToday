import React, { Component } from 'react'

import './date.scss';


function GetDate() {
  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth();
  let dd = today.getDate();
  return `${yyyy}/${mm+1}/${dd}`;
}

export default class DatePanel extends Component {
  

  render() {

    

    return (
      <div className="datePanel">
        <p className="prevDate">&lt;&lt;</p>
        <GetDate className="today" />
        <p className="nextDate">&gt;&gt;</p>
      </div>
    )
  }
}
