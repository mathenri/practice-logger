import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/records`)
      .then(reslut => reslut.json())
      .then(records => this.setState({records: records}));
  }

  render() {
    return (
      <ul>
        {this.state.records.map(record=><li key={record._id}>{record.user}: {record.hours}</li>)}
      </ul>
    );
  }
}

export default App;
