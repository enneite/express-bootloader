'use strict';
/**
 * module dependencies
 */
var mongooseApp = require('./mongoose');

/**
 * main class for initialize dbconnections
 */
var Db = function() {
	
};
/**
 * method used to initialize db connections
 * 
 * @param app
 * @param configsLoader
 */
Db.prototype.init = function(app, configsLoader) {
	// load appplication configuration
	var appConf = configsLoader.getConfig('/app');
	if (appConf['db'] != undefined) {
		var dbConf = appConf.db;
		// init db connection if parametres are set in configuration file
		if (dbConf['mongodb'] != undefined) {
			mongooseApp.init(app, configsLoader);
		}
	}	
}

var db = module.exports = exports = new Db;