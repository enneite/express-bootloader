'use strict';

/**
 * require some modules of the same packagee
 * to bootstrap the express application 
 * (set properties, define routes, define middlewares, db connection, ...)
 */
var nconf = require('nconf'), 
    settersApp = require('./setters'), // need it to set set application properties 
    dbApp = require('./db'); // need it for db connections

/** BootstrapLoader constructor.*
* The exports object of the `bootstrap-loader` module is an instance of this class.
*/
var ExpressBootloader = function() {
	this.defaults = {
			"configs_path" : "/configs/bootloader.json"
	};
}

/**
 * method to init configurations using nconf
 * 
 * default config file (configs/bootloader.json) :
 * {
 *   "bootloader" :{
 *    	"db" : {
 *	        "mongodb" : {
 *	            "host"   : "localhost",
 *	            "dbname" : "test"
 *	        }
 *	    },
 *		"settings" : {
 *			
 *		}
 *   }    
 *}
 * 
 * @param object app
 * @returns this
 */
ExpressBootloader.prototype.initConf = function(applicationPath, confPath) {
	
	nconf.defaults({'APPLICATION_PATH': applicationPath});
	
	if(confPath == undefined) {
		confPath = this.defaults['configs_path'];
	}
	nconf.file('bootloader', applicationPath +  confPath);
	
	return this;
}

/**
 * method to init common settings
 * 
 * @param object app
 * @returns this
 */
ExpressBootloader.prototype.initSettings = function(app) {
	settersApp.init(app);
	
	return this;
}

/**
 * method to init db connections and configurations
 * 
 * @param object app
 * @returns this
 */
ExpressBootloader.prototype.initDb = function(app) {
	dbApp.init(app);
	
	return this;
}

/**
 * method to bootstrap express application
 * call this method before running your server :
 * For examle : In main file : server.js
 * bootloader.init(app, __dirname, '/configs/bootloader.json');
 * or just :
 * bootloader.init(app, __dirname);
 * 
 * @param object app
 * @param string applicationPath
 * @param string configsPath
 */
ExpressBootloader.prototype.init = function(app, applicationPath, confPath) {
	
	
	// respect this order :
	this.initConf(applicationPath, confPath); //init configs
	this.initSettings(app); //init application settings
	this.initDb(app); //init db connection 
	
	return this;
	
}


/**
 * get submodules from an web appplication file
 *
 * @return object dbApp 
 */
ExpressBootloader.prototype.getDbModule = function () {
	return dbApp;
}

/**
 * get submodules from an web appplication file
 *
 * @return object settersApp 
 */
ExpressBootloader.prototype.getSettersModule = function () {
	return settersApp;
}



var expressBootloader = module.exports = exports = new ExpressBootloader;
