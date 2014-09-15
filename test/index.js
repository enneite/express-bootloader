// var assert = require("assert");
var chai = require('chai');
var assert = chai.assert;

var express = require('express');

var bootloader = require ('../lib/index.js');
var nconf = require('nconf');

describe('bootloader', function(){
  describe('#initConf()', function(){
    it('should load the conf', function(){
      bootloader.initConf(__dirname, "/bootloader.json");
      
      assert.isString(nconf.get('APPLICATION_PATH'), 'app  path must be a string');
      assert.match(nconf.get('APPLICATION_PATH'),/\/test$/, 'app path end excepted  is "/test"');
      
      var appConf = nconf.get('bootloader');
      assert.isDefined(appConf['db'],'error : db conf is undefined');
      assert.isDefined(appConf['settings'], 'error settings conf is undefined');
      
      assert.isDefined(appConf['db']['mongodb'], 'error mongodb conf is undefined');
      assert.equal(appConf['db']['mongodb']['uri'], 'mongodb://localhost/test', 'error : bad uri find for mogodb connection');
      
    });    
  });
  
  describe('#initSettings()', function(){
	    it('should init settings wih app.set()', function(){
	      bootloader.initConf(__dirname, "/bootloader.json");
	      var app = express();
	      bootloader.initSettings(app);
	      
	      assert.equal(app.get('view engine'), 'ejs', 'excepted view engine : "ejs"');
	      assert.match(app.get('views'),/\/views$/, 'app path end excepted  is "/views"');
	      	      
	    });    
	  });
  
  
})