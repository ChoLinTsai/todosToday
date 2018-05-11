import React, { Component } from 'react';
import style from './dashboard.scss';
import { Button, Icon } from 'react-materialize';


export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        userId: null
      },
      isDisplay: false,
      numberedFollower: null,
    };

  }


  shouldComponentUpdate(nextProps) {

    if (nextProps.userLogin !== this.state.userProfile.userId) {
      return true;
    } else {
      return false;
    }

  }

  componentDidUpdate() {

    this.fetchUser()

  }

  fetchUser() {

    fetch(this.props.userUrl)
    .then(res => res.json())
    .then(data => ({

        userId: data.login,
        userName: data.name,
        userAvatar: data.avatar_url,
        userLocation: data.location,
        userRepos: data.public_repos,
        userGists: data.public_gists,
        userFollowers: data.followers

      })
    )
    .then(userProfile =>
      this.setState({
        userProfile,
        userLogin: userProfile.userId,
        isDisplay: true,
      })
    )
    .catch(error => console.log(`We got errors : ${error}`))

  }

  beCommaed(inputNum) {

    return inputNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }

  render() {

    console.log(this.props);

    const {
      userName,
      userId,
      userLocation,
      userRepos,
      userGists,
      userFollowers,
      userAvatar
    } = this.state.userProfile;

    const divDisplay = this.state.isDisplay
      ? {display: 'grid'}
      : {display: 'none'}

    // const followersWithCommas = (x) => {
    //   return  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    let commaedFollowers = !isNaN(userFollowers)
      ? commaedFollowers = this.beCommaed(userFollowers)
      : null

    return (
      <section className={style.dashboardPanel}>
        <div style={divDisplay}>

          <div className={style.userUpper}>

            <img src={userAvatar} className={style.userPic} />

            <div className={style.userInfo}>
              <p className={style.userName}>{userName}</p>
              <p className={style.userId}>{userId}</p>

              <div className={style.location}>
                <Icon small
                      className={style.locationIcon}>
                      location_on
                </Icon>
                <p className={style.userLocation}>

                  {userLocation}
                </p>
              </div>

            </div>
          </div>

          <div className={style.githubInfo}>

            <div className={style.followersPanel}>
              <p className={style.followersText}>Followers</p>
              <p className={style.followersNum}>{commaedFollowers}</p>
            </div>

            <p className={style.repos}>Repos : {userRepos}</p>
            <p className={style.gist}>Gists : {userGists}</p>

          </div>


        </div>
      </section>

    );
  }
}
