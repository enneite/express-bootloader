// var assert = require("assert");
var chai = require('chai');
var assert = chai.assert;

var express = require('express');

var bootloader = require ('../lib/index.js');
var setters = require ('../lib/setters.js');
var nconf = require('nconf');

describe('bootloader.setters', function(){
    
  describe('#init()', function(){
	    it('should init settings wih app.set()', function(){
	      bootloader.initConf(__dirname, "/bootloader.json");
	      var app = express();
	      setters.init(app);
	      
	      assert.equal(app.get('view engine'), 'ejs', 'excepted view engine : "ejs"');
	      assert.match(app.get('views'),/\/views$/, 'app path end excepted  is "/views"');
	      	      
	    });    
	  });  
  
})