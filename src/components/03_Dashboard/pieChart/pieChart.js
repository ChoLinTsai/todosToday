import React, { Component } from 'react';
import style from './pieChart.scss';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js';

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static getDerivedStateFromProps(newProps, oldState) {

    let checkIsNewUserToFetch = newProps.langUrl !== oldState.langUrl
      ? true
      : false

    let resetPieChart = newProps.userID !== oldState.currentUserName
      ? true
      : false


    return {
      langUrl: newProps.langUrl,
      isNewUser: checkIsNewUserToFetch,
      isLangUrlFetched: checkIsNewUserToFetch,
      resetPieChart: resetPieChart,
    }
  }


  shouldComponentUpdate(newProps, newState) {

    if (newState.resetPieChart === true) {
      return true;
    }


    if (this.state.langUrl === undefined ||
        newProps.langUrl !== this.state.langUrl) {
      return true;
    } else if(newState.isLangUrlFetched === true) {
      return true;
    } else {
      return false;
    }

  }


  componentDidUpdate(oldProps, oldState) {

    if (this.state.resetPieChart === true) {
      this.setState({
        resetPieChart: false,
      });
    }


    if (this.state.isNewUser === true) {
      this.fetchlangUrl()
    }

  }

  fetchlangUrl() {

    fetch(this.state.langUrl)
      .then(res => res.json())
      .then(result => result)
      .then(langUsed => {

          let getLangKeys = Object.keys(langUsed);
          let getLangValues = Object.values(langUsed);

          let getSortedLangKeys = getLangKeys.length > 5
            ? getLangKeys.splice(0, 5)
            : getLangKeys;

          let getSortedLangValues = getLangValues.length > 5
            ? getLangValues.splice(0, 5)
            : getLangValues;

          this.setState({
            currentUserName: this.props.currentUserName,
            isLangUrlFetched: true,
            isNewUser: false,
            sortedLangKeys: getSortedLangKeys,
            sortedLangValues: getSortedLangValues,
          });
        }
      )
      .catch(error => console.log(`We got errors : ${error}`))
  }



  render() {

    const pieChartData = this.state.resetPieChart
      ? {}
      : {
            labels: this.state.sortedLangKeys,
            datasets: [
              {
                labels: 'Languages',
                data: this.state.sortedLangValues,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
              }
            ],
        };

    return (
      <div className={style.pieChartContainer}>
        <Pie
          data={pieChartData}
          options={{
            maintainAspectRatio: false,
            pieceLabel: {
              render: 'percentage',
              fontSize: 14,
              precision: 2,
            }
          }}
        />
      </div>
    );
  }

}
