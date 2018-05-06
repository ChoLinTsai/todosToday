import React, { Component } from 'react';
import style from './sidebar.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'
import faDashboard from '@fortawesome/fontawesome-free-solid/faTachometerAlt'
import faDatabase from '@fortawesome/fontawesome-free-solid/faDatabase';
import faLogout from '@fortawesome/fontawesome-free-solid/faSignOutAlt';

export default class Sidebar extends Component {
  render() {
    return (
      <section className={style.sidebarStyle}>
        <figure className={style.sidebarFace}>
        </figure>
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
