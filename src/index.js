import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class Index extends Component {
  render() {
    return (
      <div className="indexStyle">
        <h1>Hello</h1>
        <Button color="danger">Danger</Button>
        <Button color="danger">Danger!</Button>
      </div>
    )
  }
}


ReactDOM.render(
  <Index />,
  document.getElementById('index')
)
