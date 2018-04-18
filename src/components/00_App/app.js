import React, { Component } from 'react';
import style from './app.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'

export default class App extends Component {
  render() {
    return (
      <main className={style.mainStyle}>
        <FontAwesomeIcon icon={faUsers} size="4x"/>
      </main>
    )
  }
}
