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

    const getUserIdArry = this.state.userInfo.map( data => data.keyId )

    const getUserInfo = this.state.userInfo.map( info => {

      return <li key={info.keyId}
                 className={style.userDetail}>

                 <div className={style.upperDetail}>
                   <h2>{getUserIdArry.indexOf(info.keyId) + 1}</h2>
                   <p className={style.userName}>{info.userId}</p>
                   <button className={style.details}>Details</button>
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
