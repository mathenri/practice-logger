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
    let formattedRecords = [];
    let recordIndex = 0;
    this.state.records.forEach(function(item) {
      formattedRecords.push({x: item._id, y: item.hours, color:recordIndex});
      recordIndex++;
    });

    return (
      <div className="App">
        <XYPlot height={300} width={500} colorType="category" xType="ordinal">
          <VerticalBarSeries data={formattedRecords} />
          <YAxis />
          <XAxis />
        </XYPlot>
      </div>
    );
  }
}

export default App;
