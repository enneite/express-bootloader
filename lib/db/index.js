'use strict';
/**
 * module dependencies
 */

var nconf =  require('nconf'),
    mongooseApp = require('./mongoose');

/**
 * main class for initialize dbconnections
 */
var Db = function() {
	
};


/**
 * init mongodb connection properties : 
 */
Db.prototype.initMongodb = function (app) {	
	mongooseApp.init(app);
	
	return this;
}

/**
 * method used to initialize db connections
 * 
 * @param app
 * @param configsLoader
 */
Db.prototype.init = function(app) {
	// load appplication configuration
	var appConf = nconf.get('bootloader');
	
	if (appConf['db'] != undefined) {
		var dbConf = appConf.db;
		// init db connection if parametres are set in configuration file
		if (dbConf['mongodb'] != undefined) {
			this.initMongodb(app);
		}
	}
	
	return this;
}



/**
 * get submodules from an web appplication file
 *
 * @return object middlewareApp 
 */
Db.prototype.getMongooseModule = function() {
    return mongooseApp;
}

var db = module.exports = exports = new Db;
