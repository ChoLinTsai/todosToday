import React, { Component } from "react";
import "./app.scss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Button } from "reactstrap";

import Content from "../Content/Content";
import Todos from "../Todos/Todos";

import { connect } from "react-redux";
import { dateHandleChange, dateClickChange } from "../../actions/dateAction";

class App extends Component {
  render() {
    console.log(999, this.props.dateData);
    return (
      <div className="mainPanel">
        <div className="datePanel">
          <Button
            outline
            onClick={() => this.props.dateClickChange(-1)}
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

const mapStateToProps = state => ({
  dateData: state.dateData.startDate
});

export default connect(
  mapStateToProps,
  { dateHandleChange, dateClickChange }
)(App);
