import React, { Component } from 'react'

import './datepanel.scss';


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
        <div className="prevDate">&laquo;</div>
        <div className="today" >
          <GetDate />
        </div>
        <div className="nextDate">&raquo;</div>
      </div>
    )
  }
}
