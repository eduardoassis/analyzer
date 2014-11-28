var express = require('express');
var Analyze = require('./../../Analyze.js');
var analyze = global.analyze || new Analyze();


var app = express();

var LossRateController = function(){};

module.exports = LossRateController;

module.exports.lossRateAggregatedReport = function(req, res) {
	res.render('lossAggregatedReport');
}

module.exports.lossRateAggregated = function(req, res) {
	res.json(analyze.getAggregatedPacketLossRatePerExecutionOrderedByExperiment());
}