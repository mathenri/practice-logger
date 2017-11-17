'use strict';

var mongoose = require('mongoose'),
	Record = mongoose.model('Record');

exports.listRecords = function(req, res) {
	Record.find({}, function(err, record) {
		if (err)
			res.send(err);
		res.json(record);
	});
};

exports.createRecord = function(req, res) {
	var newRecord = new Record(req.body);
	newRecord.save(function(err, record) {
		if (err)
			res.send(err);
		res.json(record);
	});
};

exports.getRecord = function(req, res) {
	Record.findById(req.params.recordId, function(err, record) {
		if (err)
			res.send(err);
		res.json(record);
	});
};

