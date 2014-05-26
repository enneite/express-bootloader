<<<<<<< HEAD
bootstrap-loader
================
.




bootstrap-loader is an node.js module used to boot an express application : 

Set application properties, define middlewares used by the application, db connections, routes initialization, ...


The boot-loader module need to read two configuration files (json format) :
 - app.json (general configuration)
 - routes.json (routes definition)
 
Installation
-----------

```sh
npm install bootstrap-loader --save
```

example
--------

By default create the configuration files in  a directory named "/configs"

* app.json :

```json
{
	"application" : {
		"port" : 8080,
		
		"view" : { 
			"engine" : "ejs",
			"path" : "/views"			      
		},
		"custom" :{
			
		}
	},
	"static_dir" : "/public",
	"route" : {
		"path" : "/routes"
	},
	"db" : {
		"mongodb" : {
			"host"   : "localhost",
			"dbname" : "test"
		}
	}
}
```
* routes.json :

```json
[
    {
	    "pattern"   : "/",
	    "route"     : "index",
	    "method"  : "index",
	    "verb"    : "GET",
	    "_comment"  : "default page"
    },
    {
        "pattern"   : "/users",
	    "route"     : "account",
	    "method"  : "list",
	    "verb"    : "GET",
	    "_comment"  : "users list"
    }
]

```


* server.js :


```json
var express = require('express')
  , http = require('http')
  , bootloader = require('./express-bootloader');

var app = express();

bootloader.init(app, express, __dirname); 
// if any config directory is specified, try to use __dirname + '/configs'
// bootloader.init(app, express, _dirname, __dirname + '/myConfigsDirectory');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```

 
=======
express-bootloader
==================

bootstrap-loader is used to boot an express application : set properties, define middlewares, intialize routes, db connections, ...
>>>>>>> 1fab92445b9719d22bd9bff77c13288a9df9ce80
