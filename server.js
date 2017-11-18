var express = require('express'),
  	app = express(),
  	port = process.env.PORT || 3000,
  	mongoose = require('mongoose'),
  	Record = require('./api/models/model'),
  	bodyParser = require('body-parser'),
  	winston = require('winston'),
  	expressWinston = require('express-winston');

// logging middleware
app.use(expressWinston.logger({
	transports: [
		new winston.transports.Console({
			json: false,
			colorize: true,
			timestamp: true
		}),
		new winston.transports.File({ 
			filename: 'log.log' 
		})
	],
	meta: false, // log the meta data about the request
	expressFormat: true, // default message format
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RecordDB', { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Server started on port: ' + port);