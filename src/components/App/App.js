import React, { Component } from "react";
import "./app.scss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Button } from "reactstrap";

import Content from "../Content/Content";
import Todos from "../Todos/Todos";

import store from "../../store";
import { connect } from "react-redux";
import { dateHandleChange, dateClickChange } from "../../actions/dateAction";

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     startDate: moment()
  //   };
  // }

  // handleChange(date) {
  //   this.setState({
  //     startDate: date
  //   });
  // }

  // clickChange(num) {
  //   this.setState({
  //     startDate: this.state.startDate.add(num, "d")
  //   });
  // }

  shouldComponentUpdate(newProps) {
    console.log(123, newProps);
    console.log(456);
  }

  render() {
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
            selected={this.props.dateData}
            onChange={date => this.props.dateHandleChange(date)}
            className="dateInput"
          />
          <Button
            outline
            onClick={() => this.props.dateClickChange(1)}
            color="info"
            className="nextDate"
            size="md"
          >
            Next
          </Button>
        </div>
        <Content />
        {/* <Todos date={this.props.dateData} /> */}
      </div>
    );
  }
}

const mapSateToProps = state => ({
  dateData: state.dateData.startDate
});

export default connect(
  mapSateToProps,
  { dateHandleChange, dateClickChange }
)(App);
