import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App/App";
import { Provider } from "react-redux";
import store from "./store";

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="indexStyle">
          <App />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("index"));
