import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "reactstrap";
import "./datepanel.scss";

function GetDate() {
  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth();
  let dd = today.getDate();
  return `${yyyy}/${mm + 1}/${dd}`;
}

export default class DatePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  clickChange(num) {
    if (num > 0)
      return this.setState({
        startDate: this.state.startDate.add(num, "d")
      });
    if (num < 0)
      return this.setState({
        startDate: this.state.startDate.add(num, "d")
      });
  }

  render() {
    console.log(888, this.state.startDate);
    return (
      <div className="datePanel">
        <Button
          onClick={() => this.clickChange(-1)}
          color="info"
          className="prevDate"
          size="md"
        >
          Previous
        </Button>
        <div className="today">
          <GetDate />
          <DatePicker
            dateFormat="YYYY/MM/DD"
            selected={this.state.startDate}
            onChange={date => this.handleChange(date)}
            className="dateInput"
          />
        </div>
        <Button
          onClick={() => this.clickChange(1)}
          color="info"
          className="nextDate"
          size="md"
        >
          Next
        </Button>
      </div>
    );
  }
}
