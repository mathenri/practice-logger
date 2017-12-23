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
        <div className="centered">
          <XYPlot height={300} width={500} colorType="category" xType="ordinal">
            <VerticalBarSeries data={formattedRecords} />
            <YAxis />
            <XAxis />
          </XYPlot>
        </div>
        <div className="centered">
          <NameForm />
        </div>
      </div>
    );
  }
}

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('One practice hour was logged for instruement: ' + this.state.value);

    fetch('http://localhost:4000/records', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.value,
        hours: 1,
      })
    });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Instruement:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
