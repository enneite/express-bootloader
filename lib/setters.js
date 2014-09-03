'use strict';

var nconf = require('nconf'),
    path = require('path');

/**
 * main class to set properties of the express application
 */
var Setters = function () {
	this.defaults = {
			"port" : 8080,
			"views" : "views",
			"view engine" : "ejs"			
	};
};

/**
 * method used to set properties of the express application
 * 
 * @param object app
 * 
 */
Setters.prototype.init = function(app) {
	// load configuration app
	
	var appConf = nconf.get('bootloader');
	if(appConf.settings != undefined) {
		
		var settingsConf = appConf.settings;
		
		for(var key in settingsConf) {
			if (key == 'port') {
				app.set('port', process.env.PORT || settingsConf[key]);
			}
			else if (key == 'views') {
				app.set('views', path.join(nconf.get('APPLICATION_PATH'), settingsConf[key]));
			}
			else if(typeof key =='string') {
				app.set(key,settingsConf[key]);
			}
		};
	}	
}

var setters = module.exports = exports = new Setters;

