'use strict';

/**
 * the main class to initialize middlewares to use in the express application
 */
var Middlewares = function() {
	
};


/**
 * the method called in bootloader module to initialize middlewares used by the express application
 * 
 * @param object app
 * @param object express
 * @param object configsLoader
 * @param string applicationPath
 */
Middlewares.prototype.init = function(app, express, configsLoader, applicationPath) {
	
	// get the path of the static directry
	var appConf = configsLoader.getConfig('/app');
	if(appConf['static_dir'] != undefined) {
		var static_dir = appConf.static_dir
	}
	else { // if it's not define in conf file, try to use "/public" directory
		var static_dir = '/public';
	}
	var staticPath = applicationPath + static_dir;
	
	//standardsexpress application middlewares
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(staticPath));	
	
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
}


var middlewares = module.exports = exports = new Middlewares;


