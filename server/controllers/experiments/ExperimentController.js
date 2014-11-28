var fs = require('fs'),
  vm = require('vm'),
  express = require('express'),
  fs = require("fs");

var Flow = require('./../../Flow.js');
var Experiment = require('./../../Experiment');

//var path = "/home/eduardo/Dropbox/workspace/metricas/traces/";
//var path = "/media/eduardo/e224e050-3480-44c8-9e3d-1aa15dc39354/eduardo/Dropbox/workspace/metricas/traces/";

var app = express();

//experiment.startAnalysis();
//console.log(JSON.stringify(experiment));

//app.get('/startAnalysis', routes.index(config));

var ExperimentController = function(){};

module.exports = ExperimentController;

module.exports.startAnalysis = function(data, callback){
  res.json({
    labels : ["January","February","March","April","May","June","July"],
    datasets : 
    [

      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
      },

      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
      },

      {
        fillColor : "red",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [10,15,30,0,1,2,44]
      }   

    ]
  });
};