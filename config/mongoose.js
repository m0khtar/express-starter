var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var uri = config.db,
		db = mongoose.connect(uri);

	//events
	mongoose.connection.on('connected', function() {
		console.log('Mongoose connected to ' + uri);
	});
	mongoose.connection.on('error', function(err) {
		console.log('Mongoose connection error: ' + err);
	});
	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose disconnected');
	});
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose disconnected');
			process.exit(0);
		});
	});

	//register models
	require('../app/models/user.js');

	return db;
};