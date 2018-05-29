import React, { Component } from 'react';
import style from './userRepoList.scss';
import { Icon } from 'react-materialize';
import PieChart from '../pieChart/pieChart';

export default class UserRepoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      reposInfo: [],
      isFetched: false,
      isLangUrlChanged: false,
      isNewUser: false,
    };
  }

  static getDerivedStateFromProps(newProps, oldState) {

    let checkIsNewUser = newProps.userID !== oldState.userID
      ? true
      : false;

    return {
      userID: newProps.userID,
      userReposUrl: newProps.userReposUrl,
      isNewUser: checkIsNewUser,
      isFetched: false,
    }

  }

  shouldComponentUpdate(newProps, newState) {

    if ( newProps.userID === null ||
          newProps.userID !== this.props.userID) {

      return true;

    } else if(newState.isFetched === true){

      return true;

    } else if (newState.isLangUrlChanged === true){

      return true;

    } else {

      return false;

    }

  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.isLangUrlChanged) {
      this.setState({
        isLangUrlChanged: false,
      });
      return ;
    }


    if (oldState.userID !== this.state.userID ||
          this.state.isFetched !== true) {
      this.fetchUser();
    }
  }


  fetchUser() {
    fetch(this.state.userReposUrl)
      .then(res => res.json())
      .then(result => result.map( data => ({
            keyID: data.id,
            userID: data.owner.login,
            repoName: data.name,
            languageUsed: data.language,
            languageUrl: data.languages_url,
            stars: data.stargazers_count,
        })
      ))
      .then(reposInfo => {
          this.setState({
            reposInfo: reposInfo,
            isFetched: true,
          })
        }

      )
      .catch(error => console.log(`We got errors : ${error}`))

  }


  passUrlToChart(languageUrl, repoName) {
    if (repoName === this.state.currentRepoName) {
      return ;
    }
    this.setState({
      languageUrl: languageUrl,
      currentRepoName: repoName,
      isLangUrlChanged: true,
    });
  }

  render() {

    const itemLists = this.state.reposInfo.map( i => {
      return <li key={i.keyID}
                 className={style.listItem}
                 onClick={() => this.passUrlToChart(i.languageUrl, i.repoName)} >

                  <h3>{i.repoName}</h3>

                  <div className={style.listItemRight}>

                    <div className={style.itemRightTop}>
                      <Icon small
                            className={style.iconStar}>
                            star_border
                      </Icon>
                      <p className={style.starCount}>{i.stars}</p>
                    </div>

                    <div className={style.itemRightBottom}>
                      <Icon small
                            className={style.iconCode}>
                        code
                      </Icon>
                      <p className={style.codeUsed}>
                        {i.languageUsed}
                      </p>
                    </div>

                  </div>

             </li>
    });

    const getRepoCount = this.state.reposInfo.length;

    const ulGridTempRows = {
      gridTemplateRows: `repeat(${getRepoCount}, 100px)`,
    }


    return (
      <div className={style.chartPanel}>

        <div className={style.repoDetails}>
          <ul style={ulGridTempRows}
              className={style.unorderedList}>
              {itemLists}
          </ul>
        </div>


        <PieChart langUrl={this.state.languageUrl}
                  isNewUser={this.state.isNewUser}
                  currentUserName={this.state.userID}
                  isUserChanged={this.props.isUserChanged}/>

      </div>
    );
  }
};
