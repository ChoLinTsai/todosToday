import React, { Component } from 'react'

import Date from '../Date/Date';
import Content from '../Content/Content';

export default class App extends Component {
  render() {
    return (
      <div>
        <Date />
        <Content />
      </div>
    )
  }
}
