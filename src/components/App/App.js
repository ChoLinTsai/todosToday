import React, { Component } from "react";
import "./app.scss";

import DatePanel from "../Date/DatePanel";
import Content from "../Content/Content";
import Todos from "../Todos/Todos";

export default class App extends Component {
  render() {
    return (
      <div className="mainPanel">
        <DatePanel />
        <Content />
        <Todos />
      </div>
    );
  }
}
