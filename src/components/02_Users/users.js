import React, { Component } from 'react';
import style from './users.scss';

export default class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    }
  }


  componentDidMount() {

    this.fetchData()

  }

  fetchData() {

    fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(data => data.map( data => (
      {

        keyId: data.id,
        userId: data.login,
        githubUrl: data.html_url,
        repos: data.public_repos,
        gists: data.public_gists,

      }
    )))
    .then(userInfo => this.setState({
      userInfo
    }))
    .catch(err => console.log(`We got : ${err}`))



  }


  render() {

    const getUserInfo = this.state.userInfo.map( info => {
      return <li key={info.keyId}
                 className={style.userDetail}>
              {info.userId}
             </li>
    })

    return (
      <section className={style.usersPanel}>
        <ul className={style.userInfo}>
          <a href="#" className={style.userDetail}>
            <li>
              test
            </li>
          </a>
        </ul>
      </section>
    )
  }
}
