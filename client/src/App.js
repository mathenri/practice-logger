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
    this.state = { 
      instrument: 'Trombone',
      hours: 2
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert(this.state.hours + ' practice hours was logged for instrument: ' + this.state.instrument);

    fetch('http://localhost:4000/records', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.instrument,
        hours: this.state.hours,
      })
    });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Instrument:
          <select name="instrument" value={this.state.instrument} onChange={this.handleChange}>
            <option value="Trombone">Trombone</option>
            <option value="Cornet">Cornet</option>
            <option value="Tuba">Tuba</option>
            <option value="Horn">Horn</option>
          </select>
        </label>
        <label>Hours:
          <input name="hours" type="number" value={this.state.hours} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
