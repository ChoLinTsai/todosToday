import React, { Component } from 'react';
import style from './sidebar.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'
import faDashboard from '@fortawesome/fontawesome-free-solid/faTachometerAlt'
import faDatabase from '@fortawesome/fontawesome-free-solid/faDatabase';
import faLogout from '@fortawesome/fontawesome-free-solid/faSignOutAlt';





export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myPic: '',
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/users/cholintsai')
      .then(res => res.json())
      .then(data => {
        this.setState({
          myPic: data.avatar_url,
        });
      })
      .catch(err => console.log(`We got errors : ${err}`))
  }



  render() {

    const myPicUrl = this.state.myPic;


    return (
      <section className={style.sidebarStyle}>
        <img src={myPicUrl} className={style.sidebarFace}/>
        <div className={style.sidebarBody}>
          <FontAwesomeIcon icon={faUsers} size="3x"/>
          <FontAwesomeIcon icon={faDashboard} size="3x"/>
          <FontAwesomeIcon icon={faDatabase} size="3x"/>
        </div>

        <div className={style.sidebarFooter}>
          <FontAwesomeIcon icon={faLogout} size="3x"/>
        </div>
      </section>
    )
  }
}
