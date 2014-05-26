'use strict';

/**
 * main class to set properties of the express application
 */
var Setters = function () {
	
};

/**
 * method used to set properties of the express application
 * 
 * @param object app
 * @param object configsLoader
 * @param string applicationPath
 */
Setters.prototype.init = function(app, configsLoader, applicationPath) {
	// load configuration app	
	var appConf = configsLoader.getConfig('/app');
	appConf = appConf.application;
	
	// if port isn't define in configuration listen on 8080
	if(appConf['port'] == undefined) {
		var port = 8080;
	}
	else{
		var port = appConf.port;
	}
	app.set('port', process.env.PORT || port);
	
	// if views directory isn't define in configuration,
	// try to use a directory named "views"
	if(appConf['view'] == undefined || appConf['view']['path'] == undefined) {
		var viewPath = '/views';
	}
	else{
		var viewPath = appConf.view.path;
	}
	app.set('views', applicationPath + appConf.view.path);
	
	// if views template engine isn't define in configuration,
	// try to use ejs
	if(appConf['view'] == undefined || appConf['view']['engine'] == undefined) {
		var viewPath = 'ejs';
	}
	else{
		var viewEnginr = appConf.view.engine;
	}
	app.set('view engine', appConf.view.engine);
	
	//set custom properties defined in configuration file ->application->custom
	if(appConf['custom'] !=undefined) {
		for(var key in appConf.custom) {
			app.set(key, appConf.custom[key]);
		}
	}	
}

var setters = module.exports = exports = new Setters;

