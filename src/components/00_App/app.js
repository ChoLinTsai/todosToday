import React, { Component } from 'react';
import style from './app.scss';
import Sidebar from '../01_Sidebar/sidebar';
import Users from '../02_Users/users'

export default class App extends Component {
  render() {
    return (
      <main className={style.mainStyle}>
        <Sidebar />
        <Users />
      </main>
    )
  }
}
