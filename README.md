bootstrap-loader
================
.

bootstrap-loader is an node.js module used to boot an express application : 

Set application properties and db connections, routes initialization

WARNING : v0.2.0 isn't comptabible with 0.1.*


The boot-loader module need to read one configuration files (json format) :
 - bootloader.json (general configuration)
 
Installation
-----------
You can install it with npm :

```sh
npm install express-bootloader --save
```

Or you can registrer it in the package.json of your express web application



example
--------

By default create the configuration files in  a directory named "/configs"

* app.json :

```json
{
    "bootloader" :{
    	"db" : {
	        "mongodb" : {
	            "uri" : "mongodb://localhost/test"
	        }
	    },
		"settings" : {
			"port" : 3000,
			"views" : "views",
			"view engine" : "ejs"
		}
    }    
}
```

* app.js :

// [...]

```javascript
var bootloader = require('../express-bootloader');

var app = express();

bootloader.init(app,__dirname);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

// [...]

```

 
