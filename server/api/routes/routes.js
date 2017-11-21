'use strict';
module.exports = function(app) {
	var controller = require('../controllers/controller.js');

	// routes
	app.route('/records')
		.get(controller.listRecords)
		.post(controller.createRecord);

	app.route('/records/:recordId')
		.get(controller.getRecord)
		.put(controller.updateRecord)
		.delete(controller.deleteRecord);
};