var assert = require("assert")

var bootloader = require ('../lib/index.js');
var nconf = require('nconf');


describe('bootloader', function(){
  describe('#initConf()', function(){
    it('should load the conf', function(){
      bootloader.initConf(__dirname, "/bootloader.json");
      
      console.log(nconf.get('bootloader'), nconf.get('APPLICATION_PATH'));
      
      assert.ok(typeof nconf.get('APPLICATION_PATH') == 'string');
      assert.ok(nconf.get('APPLICATION_PATH').match(/\/test$/) != null);
      
      var appConf = nconf.get('bootloader');
      assert.ok(appConf['db'] != undefined);
      assert.ok(appConf['settings'] != undefined);
      
      assert.ok(appConf['db']['mongodb'] != undefined, 'ERROR');
      assert.ok(appConf['db']['mongodb']['uri'] == 'mongodb://localhost/test', 'ERROR');
      
    })
    
    
    
    
  })
})