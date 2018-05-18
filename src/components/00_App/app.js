import React, { Component } from 'react';
import style from './app.scss';
import Sidebar from '../01_Sidebar/sidebar';
import Users from '../02_Users/users';
import Dashboard from '../03_Dashboard/dashboard';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  onClick(userUrl, userLogin) {
    this.setState({
      userUrl: userUrl,
      userLogin: userLogin,
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
          userUrl={this.state.userUrl} userLogin={this.state.userLogin} />
      </main>
    )
  }
}
