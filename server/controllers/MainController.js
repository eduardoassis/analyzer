var express = require('express');
var Analyze = require('./../Analyze.js');
var app = express();
var analyze = global.analyze || new Analyze();

var MainController = function(){};

module.exports = MainController;

module.exports.home = function(req, res) {

	analyze.start();
	res.render('index');
}