'use strict';

/**
 * main class to initialize routes of the express application
 */
var Routes = function() {
	
};

/**
 * the method called in bootloader module to initialize express application routes
 * 
 * @param object app
 * @param object configsLoader
 * @param string applicationPath
 */
Routes.prototype.init = function (app, configsLoader, applicationPath) {
	
	// load routes configuration
	var routesConf = configsLoader.getConfig('/routes');
	// load application configuration
	var appConf = configsLoader.getConfig('/app');
	
	// if the directory contaning routes functions isn't define in application path
	// bootloader try to use a directory named "routes"
	if (appConf['route'] == undefined || appConf['route']['path'] == undefined) {
		var routesPath = applicationPath + '/routes';
	}
	else{
		var routesPath = applicationPath + appConf.route.path;
	}
	
	// an associative array	containing routes functions name as key and routes module as value
	var routesLoaded = new Array();
	
	// loop on routes configurations (json Array)
	for (var i=0; i<routesConf.length;i++) {
		// the name of route module
		var routeName = routesConf[i]["route"];
		
		//require ONLY ONE TIME the route module !
		if(routesLoaded[routeName] == undefined) {
			if(routeName == 'index') {
				routesLoaded[routeName] = require(routesPath);
			}
			else {
				routesLoaded[routeName] = require(routesPath +'/' + routeName);
			}
		}
		
		// load routes with pattern, http verb an module's method :
		var verb = routesConf[i]["verb"]; // the http method to use (GET, POST, PUT, DELETE)
		var pattern = routesConf[i]["pattern"]; // the pattern of the route
		var functionName = routesConf[i]["method"]; // the specific method of the module to use for this pattern
		if( verb == 'POST') {
			app.post(pattern, routesLoaded[routeName][functionName]);
		}
		else if ( verb == 'PUT') {
			app.put(pattern, routesLoaded[routeName][functionName]);
		}
		else if( verb == 'DELETE') {
			app.delete(pattern, routesLoaded[routeName][functionName]);
		}
		else { // by default GET HTTP method i used
			app.get(pattern, routesLoaded[routeName][functionName]);
		}
		
	}
	
}

var routes = module.exports = exports = new Routes;