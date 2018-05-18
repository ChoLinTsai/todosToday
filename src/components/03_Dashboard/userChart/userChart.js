import React, { Component } from 'react';
import style from './userChart.scss';

export default class UserChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      reposInfo: [],
      isFetched: false,
    };
  }


  static getDerivedStateFromProps(newProps) {

    return {
      userID: newProps.userID,
      userReposUrl: newProps.userReposUrl,
    }
  }


  shouldComponentUpdate(newProps, newState) {

    if ( newProps.userID === null ||
          newProps.userID !== this.props.userID) {

      return true;

    } else if(newState.isFetched === true){

      return true;

    } else {

      return false;

    }

  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchUser()
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
            isFetched: !this.state.isFetched,
          })
        }

      )
      .catch(error => console.log(`We got errors : ${error}`))

  }

  render() {


    const testList2 = this.state.reposInfo.map( i => {
      return <li key={i.keyID}
                 className={style.listItem}>

                  <p>{i.repoName}</p>

             </li>
    });

    const ulGridTempRows = {
      gridTemplateRows: `repeat(30, 100px)`,
    }

    return (
      <div className={style.chartPanel}>
        <div className={style.repoDetails}>
          <ul className={style.unorderedList}>
            {testList2}
          </ul>
        </div>
      </div>
    );
  }
};
