import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './index.scss';
import App from './components/00_App/app';

class Index extends Component {
  render() {
    return (
      <div className={style.indexStyle}>
        <App />
      </div>
    )
  }
}


ReactDOM.render(
  <Index />,
  document.getElementById('index')
)
