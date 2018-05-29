import React, { Component } from 'react';
import style from './app.scss';
import Sidebar from '../01_Sidebar/sidebar';
import Users from '../02_Users/users';
import Dashboard from '../03_Dashboard/dashboard';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUrlSent: false,
      isUrlChanged: false,
    };
  }

  onClick(userUrl, userLogin) {

    let isUserChanged = userLogin !== this.state.userLogin
      ? true
      : false

    this.setState({
      userUrl: userUrl,
      userLogin: userLogin,
      isUserChanged: isUserChanged,
    });
  }

  render() {
    return (
      <main className={style.mainStyle}>

        <Sidebar />

        <Users clickEvent={
          (userUrl, userLogin) => this.onClick(userUrl, userLogin)
        }/>

        <Dashboard
          userUrl={this.state.userUrl} userLogin={this.state.userLogin}
          userChangedTo={this.state.userLogin}
          isUserChanged={this.state.isUserChanged} />

      </main>
    )
  }
}
