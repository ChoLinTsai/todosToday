import React, { Component } from "react";

import "./app.scss";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import moment from "moment";
import { Button } from "reactstrap";

import Content from "../Content/Content";
import Todos from "../Todos/Todos";

export default class App extends Component {
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
    this.setState({
      startDate: this.state.startDate.add(num, "d")
    });
  }

  render() {
    console.log(this.props);

    return (
      <div className="mainPanel">
        <div className="datePanel">
          <Button
            outline
            onClick={() => this.clickChange(-1)}
            color="info"
            className="prevDate"
            size="md"
          >
            Previous
          </Button>
          <DatePicker
            dateFormat="YYYY/MM/DD"
            selected={this.state.startDate}
            onChange={date => this.handleChange(date)}
            className="dateInput"
          />
          <Button
            outline
            onClick={() => this.clickChange(1)}
            color="info"
            className="nextDate"
            size="md"
          >
            Next
          </Button>
        </div>
        <Content />
        <Todos date={this.state.startDate} />
      </div>
    );
  }
}
