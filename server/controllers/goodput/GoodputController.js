var express = require('express');
var Analyze = require('./../../Analyze.js');
var analyze = global.analyze || new Analyze();


var app = express();

var GoodputController = function(){};

module.exports = GoodputController;

// Retorna somente a página (html) de relatório
module.exports.goodputAggregatedReport = function(req, res) {
  res.render('goodputAggregatedReport');
}

// realiza o cálculo para gerar o relatório
module.exports.getAggregatedGoodPutPerExecutionOrderedByExperiment = function(req, res) {
	res.json(analyze.getAggregatedGoodPutPerExecutionOrderedByExperiment());
};

// Retorna somente a página (html) de relatório
module.exports.getAggregatedGoodPutOfAllExecutionsReport = function(req, res) {
  res.render('goodputAggregatedPerExperimentReport');
}

// realiza o cálculo para gerar o relatório
module.exports.getAggregatedGoodPutOfAllExecutions = function (req, res) {
	res.json(analyze.getAggregatedGoodPutOfAllExecutions());
};