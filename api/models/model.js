'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
	user: {
		type: String,
		required: 'Kindly enter the name of the user'
	},
	hours: {
		type: String,
		required: 'Kindly enter the amount of hours practiced'
	},
	Created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Records', RecordSchema);