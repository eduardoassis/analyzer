'use strict';

var express = require('express');
var fs = require('fs');
var experiments = require('./server/controllers/experiments/ExperimentController');
var main = require('./server/controllers/MainController');
var goodput = require('./server/controllers/goodput/GoodputController');
var lossRate = require('./server/controllers/lossRate/LossRateController');

module.exports = function(app) {
	
	/* HOME */

	app.get('/home', function(req, res){
		main.home(req, res);
	});

	/* GOODPUT */

	app.get('/goodputAggregatedPerFlow/report', function(req, res){
		goodput.goodputAggregatedReport(req, res);
	});

	app.get('/goodputAggregated', function(req, res, next){
		goodput.getAggregatedGoodPutPerExecutionOrderedByExperiment(req, res);
  	});

	// ---------------------------------------------------------------------------------------------------

	app.get('/goodputAggregatedPerExperiment/report', function(req, res){
		goodput.getAggregatedGoodPutOfAllExecutionsReport(req, res);
	});

  	app.get('/goodputAggregatedOfAllExecutions', function(req, res, next){
		goodput.getAggregatedGoodPutOfAllExecutions(req, res);
  	});

  	/* LOSS RATE*/

  	app.get('/lossRateAggregated/report', function(req, res){
    	lossRate.lossRateAggregatedReport(req, res);
  	});

  	
  	app.get('/lossRateAggregated', function(req, res, next){
  		lossRate.lossRateAggregated(req, res);
  	});

	
};