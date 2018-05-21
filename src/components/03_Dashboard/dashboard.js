import React, {Component} from 'react';
import style from './dashboard.scss';
import { Icon } from 'react-materialize';
import UserChart from './userChart/userChart';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        userId: null,
      },
      isDisplay: false,
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
        userFollowers: data.followers,
        userReposUrl: data.repos_url,

      }))
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
      ? { display: 'grid' }
      : { display: 'none' }

    let commaedFollowers = !isNaN(userFollowers)
      ? commaedFollowers = this.beCommaed(userFollowers)
      : null;

    let commaedRepos = !isNaN(userRepos)
      ? commaedRepos = this.beCommaed(userRepos)
      : null;

    let commaedGists = !isNaN(userGists)
      ? commaedGists = this.beCommaed(userGists)
      : null;


    // console.log('this is dashboard props',this.props);
    // console.log('          ');
    // console.log('          ');

    return  (
      <section className={style.dashboardPanel}>
        <div style={divDisplay} className={style.divDisplay}>

          <div className={style.userUpper}>

            <img src={userAvatar} className={style.userPic}/>

            <div className={style.userInfo}>
              <p className={style.userName}>{userName}</p>
              <p className={style.userId}>{userId}</p>

              <div className={style.location}>
                <Icon small className={style.locationIcon}>
                  location_on
                </Icon>
                <p className={style.userLocation}>
                  {userLocation}
                </p>
              </div>

            </div>
          </div>

          <div className={style.githubInfo}>

            <div className={`${style.followers} ${style.panel}`}>
              <p className={style.infoText}>Followers</p>
              <p className={style.infoNum}>{commaedFollowers}</p>
            </div>

            <div className={`${style.repos} ${style.panel}`}>
              <p className={style.infoText}>Repos</p>
              <p className={style.infoNum}>{commaedRepos}</p>
            </div>

            <div className={`${style.gists} ${style.panel}`}>
              <p className={style.infoText}>Gists</p>
              <p className={style.infoNum}>{commaedGists}</p>
            </div>
          </div>

          <UserChart
            userID={this.state.userProfile.userId}
            userReposUrl={this.state.userProfile.userReposUrl}
          />
        </div>
      </section>
    );
  }
}