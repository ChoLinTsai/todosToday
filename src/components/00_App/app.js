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


  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('===== this is shouldComponentUpdate');
  //   console.log('this is nextState', nextState);
  //   console.log('this is this.state', this.state);
  //   console.log('          ');
  //   console.log('          ');
  //   return true;
  // }
  //
  //
  // componentDidUpdate(prevProps, oldState) {
  //   console.log('===== this is componentDidUpdate');
  //   console.log('===== this is prevState', oldState);
  //   console.log('===== this is this.state',this.state);
  //   console.log('          ');
  //   console.log('          ');
  //
  //   this.setState({
  //     isUrlSent: !this.state.isUrlSent,
  //   });
  // }





  onClick(userUrl, userLogin) {
    this.setState({
      userUrl: userUrl,
      userLogin: userLogin,
      isUrlSent: true,
    });
    // console.log('onClick event clicked');
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
          sentUrlToChart={this.state.isUrlSent} />
      </main>
    )
  }
}
