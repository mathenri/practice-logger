import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, VerticalBarSeries} from 'react-vis';

class App extends Component {
  constructor() {
    super();
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/records-sum-by-user`)
      .then(reslut => reslut.json())
      .then(records => this.setState({records: records}));
  }

  render() {
    const data = [
      {x: 'Trombone', y: 25, color: 1},
      {x: 'Cornet', y: 15, color: 2},
      {x: 'Horns', y: 16, color: 3},
    ];

    // const sumByKey = function(arr) {
    //   return arr.reduce(function(groups, item) {
    //     const key = item['user']
    //     const val = item['hours'];
    //     groups[key] = groups[key] || 0;
    //     groups[key] = groups[key] + parseFloat(val);
    //     return groups;
    //   }, {});
    // }

    // const recs = this.state.records;
    // const summedData = sumByKey(recs);
    // let summedDataList = [];
    // let index = 0;
    // for (let user in summedData) {
    //   summedDataList.push({user:user, hours:summedData[user], id:index});
    //   index++;
    // }
    // console.log(summedDataList);
    console.log(this.state.records);
    return (
      <div className="App">
        <XYPlot height={300} width={500} colorType="category" xType="ordinal">
          <VerticalBarSeries data={data} />
          <YAxis />
          <XAxis />
        </XYPlot>
        <ul>
          {this.state.records.map(record=><li key={record.user}>{record.user}: {record.hours}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
