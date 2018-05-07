import React, { Component } from 'react';
import style from './users.scss';
import { Button, Icon } from 'react-materialize'

export default class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    }
  }


  componentDidMount() {

    this.fetchGithubUsers()

  }

  fetchGithubUsers() {

    fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(data => data.map( data => ({
        keyId: data.id,
        userId: data.login,
        userUrl: data.url
      })
    ))
    .then( userInfo =>
      this.setState({
        userInfo
      })
    )
    .catch(err => console.log(`We got errors : ${err}`))

  }



  render() {

    console.log(this.state.userInfo);

    const getUserIdAry = this.state.userInfo.map( data => data.keyId )

    const getUserInfo = this.state.userInfo.map( info => {

      return  <li key={info.keyId}
                  className={style.userDetail}>

                <div className={style.upperDetail}>
                <h2>{getUserIdAry.indexOf(info.keyId) + 1}</h2>
                <p className={style.userName}>{info.userId}</p>
                <Button
                  waves='light'
                  className={style.details}
                  onClick={() => console.log(info.userId)}>

                  Details

                </Button>

                </div>

             </li>
    })

    return (
      <section className={style.usersPanel}>
        <ul className={style.userInfo}>
          {getUserInfo}
        </ul>
      </section>
    )
  }
}
