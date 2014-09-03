'use strict';

/**
 * Module dependency : mongoose
 */
var nconf = require('nconf'),
    mongoose = require('mongoose');

/**
 * main class used to initialize mongodb connection
 */
var MongooseConn = function() {
	
}

/**
 * method used to init ongodb connection, disconnection, ...
 * 
 * @param app
 * @param configsLoader
 */
MongooseConn.prototype.init = function(app) {
	// get the mongodb server / database config
	var appConf = nconf.get('bootloader');
	var mongoConf = appConf.db.mongodb;
	
	// build connection URI :
	var dbURI = mongoConf.uri // for example : dbUri = 'mongodb://localhost/test'
	
		
	// Create the database connection
	mongoose.connect(dbURI, {
		server : {auto_reconnect:true},
		db : {native_parser : false}
	});
	
	// CONNECTION EVENTS
	
	//when opening connection
	mongoose.connection.on('open', function() {
	    console.log('MongoDB connection opened...');
	});
	
	// when connecting ...
	mongoose.connection.on('connecting', function() {
	    console.log('connecting to MongoDB...');
	});
	
	// When successfully connected	
	mongoose.connection.on('connected', function () {	
	  console.log('Mongoose default connection open to ' + dbURI);	
	});
	
	// when reconnected
	mongoose.connection.on('reconnected', function () {	
		  console.log('Mongoose reconnected to ' + dbURI);	
		});
	
	// If the connection throws an error	
	mongoose.connection.on('error',function (err) {	
	  console.log('Mongoose default connection error: ' + err);	
	});
	
	// When the connection is disconnected	
	// try to reconnect to the mongodb server
	mongoose.connection.on('disconnected', function () {	
	  console.log('Mongoose default connection disconnected');
	  mongoose.connect(dbURI, {
			server : {auto_reconnect:true},
			db : {native_parser : false}
		});
	});
	
	mongoose.connection.on('disconnecting', function() {
	    console.log('closing MongoDB connection...');
	});
	
	// If the connection throws an error	
	mongoose.connection.on('close',function () {	
	  console.log('connection MongoDB closed');	
	});
	
	// If the Node process ends, close the Mongoose connection	
	process.on('SIGINT', function() {	
	    mongoose.connection.close(function () {	
	        console.log('Mongoose default connection disconnected through app termination');
		        process.exit(0);	
	    });	
	});	
}

var mongooseConn = module.exports = exports = new MongooseConn;