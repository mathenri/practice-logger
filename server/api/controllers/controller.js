'use strict';

var mongoose = require('mongoose'),
  	Record = mongoose.model('Record');

exports.listRecords = function(req, res) {
	Record.find({}, function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
};

exports.listRecordsSumByUser = function(req, res) {
	Record.aggregate([ { $group : { _id : "$user", hours: {$sum: "$hours"} } } ], function(err, records) {
		if (err)
			res.send(err);
		res.json(records)
	});
}

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

exports.updateRecord = function(req, res) {
  	Record.findOneAndUpdate({_id: req.params.recordId}, req.body, {new: true}, function(err, record) {
    	if (err)
      		res.send(err);
    	res.json(record);
  	});
};

exports.deleteRecord = function(req, res) {
  	Record.remove({
    	_id: req.params.recordId
  	}, function(err, record) {
    	if (err)
      		res.send(err);
    	res.json({ message: 'Record successfully deleted' });
  	});
};

