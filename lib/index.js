'use strict';

/**
 * require some modules of the same packagee
 * to bootstrap the express application 
 * (set properties, define routes, define middlewares, db connection, ...)
 */
var settersApp = require('./setters'), // need it to set set application properties 
    dbApp = require('./db'), // need it for db connections
    middlewaresApp  = require('./middlewares'), // need it for using some middlewares
    routesApp = require('./routes') ; // need it to define routes

/** BootstrapLoader constructor.*
* The exports object of the `bootstrap-loader` module is an instance of this class.
*/
var ExpressBootloader = function() {
	
}

/**
 * getLoader method : 
 * use as parameter the path of configuration files needeed for this module
 * this method return an object whitch has a method getConfig() to load a specific config file
 * the possible files are app.json and routes.jon
 * 
 * @param string configsPath
 * @returns object
 */
ExpressBootloader.prototype.getLoader = function(configsPath) {
	// private poperty of this method
	var mainPath = configsPath;
	return {
            getConfig : function (pathName) {
		       var obj = require( mainPath + pathName + '.json' );
                       return obj;  
	        }
	}	
}

/**
 * method to bootstrap express application
 * call this method before running your server :
 * For examle : In main file : server.js
 * bootloader.init(app, express, __dirname, __dirname+'/configs');
 * 
 * @param object app
 * @param object express
 * @param string applicationPath
 * @param string configsPath
 */
ExpressBootloader.prototype.init = function(app, express, applicationPath, configsPath) {
	
	// if you don't specify config path, the function will search configs files
	// in a repertory named "configs" in head of your application directory
	if(configsPath == undefined) {
		configsPath = applicationPath + '/configs';
	}
	
	//instance of the config Loader to load config when it's needed
	var configsLoader = this.getLoader(configsPath);
	
	// respect this order :
	settersApp.init(app, configsLoader, applicationPath); //init express application properties
	dbApp.init(app, configsLoader); // init db connections
	middlewaresApp.init(app, express, configsLoader, applicationPath); // define middlewares to use
	routesApp.init(app, configsLoader, applicationPath); // define routes of the express application
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

/**
 * get submodules from an web appplication file
 *
 * @return object middlewareApp 
 */
ExpressBootloader.prototype.getMiddlewaresModule = function () {
	return middlewaresApp;
}

/**
 * get submodules from an web appplication file
 *
 * @return object middlewareApp 
 */
ExpressBootloader.prototype.getRoutesModule = function () {
	return routesApp;
}




var expressBootloader = module.exports = exports = new ExpressBootloader;
