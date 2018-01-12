import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import './LogHoursForm.css';

class LogHoursForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			instrument: 'Trombone',
			hours: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const target = e.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

	handleSubmit(e) {
		alert('Submitting instrument ' + this.state.instrument + ', hours: ' + this.state.hours);

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
		
		e.preventDefault();
	}

	render() {
		return (
			<div className="log-hours-form center-block">
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="instrumentControl">
					<ControlLabel>Instrument</ControlLabel>
					<FormControl componentClass="select" 
								 value={this.state.instrument} 
								 placeholder="Enter instrument" 
								 onChange={this.handleChange}
								 name="instrument">
						<option value="Trombone">Trombone</option>
						<option value="Horn">Horn</option>
						<option value="Cornet">Cornet</option>
						<option value="Tuba">Tuba</option>
					</FormControl>
				</FormGroup>
				<FormGroup controlId="hoursControl">
					<ControlLabel>Hours</ControlLabel>
					<FormControl type="number"
								 value={this.state.hours} 
								 placeholder="Number of hours practiced"
								 onChange={this.handleChange}
								 name="hours" />
				</FormGroup>
				<Button type="submit" bsStyle="success">Submit</Button>
			</form>
			</div>
		);
	}
}

export default LogHoursForm;