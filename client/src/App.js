import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
import {Jumbotron, Button} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import LogHoursForm from './LogHoursForm'

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
        <div className="container">
          <Jumbotron>
          <h1>Practice logger</h1>
          <p>Log you practice hours here!</p>
          <p>
            <Button bsStyle="primary">Log hours</Button>
          </p>
          </Jumbotron>
        </div>
        <div className="centered">
          <XYPlot height={300} width={500} colorType="category" xType="ordinal">
            <VerticalBarSeries data={formattedRecords} />
            <YAxis />
            <XAxis />
          </XYPlot>
        </div>
        <LogHoursForm />
      </div>
    );
  }
}

export default App;
