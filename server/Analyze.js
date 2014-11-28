var fs = require("fs");
var lineReader = require('line-reader');
var Experiment = require('./Experiment');
//var path = "/media/eduardo/e224e050-3480-44c8-9e3d-1aa15dc39354/eduardo/Dropbox/workspace/metricas/traces/";
//var path = "/home/eduardo/Dropbox/workspace/metricas/traces";
var path = "/home/eduardo/Área de Trabalho/results/";

var Analyze = function() {
  this._experiments = {};

  this.readPaths(path, this.readPath);  
}

Analyze.VALUE_INITIAL_ID = 1;

Analyze.prototype.gerarId = function(experimentName) {

  var numberPart = Object.keys(this._experiments).length > 0 ? Object.keys(this._experiments).length + 1 : Analyze.VALUE_INITIAL_ID;

  var id = experimentName + "_" + numberPart;

  return id;
};

Analyze.prototype.getNameExperiment = function(path) {

  var result = path.split("/");
  return result[result.length - 1] != null ? result[result.length - 1] : undefined;
};

Analyze.prototype.createExperiment = function(path, fileNames) {

  var experimentName = this.getNameExperiment(path) ? this.getNameExperiment(path) : id;

  var id = this.gerarId(experimentName);

  if(!this.hasExperiment(id)) {
   
    var experiment = new Experiment(id, experimentName, path, fileNames);
    this._experiments[id] = experiment;

    return experiment;
  }

}

Analyze.prototype.getExperiment = function(idExperiment) {
  return this._experiments[idExperiment];
}

Analyze.prototype.hasExperiment = function(idExperiment) {
  return this._experiments[idExperiment] ? true : false;
};

Analyze.prototype.readPath = function(pathName) {
  
  var fileNames = fs.readdirSync(pathName);
  this.createExperiment(pathName, fileNames);
};

Analyze.prototype.readPaths = function (path, readPath) {
  
  var that = this;

  that.validateFolderStructure(path);

  var files = fs.readdirSync(path);

  files.forEach(function(file){

      var stats = fs.statSync(path + file);

      if(stats.isDirectory()) {

          that.readPath(path + file);
      }

  });  
}

Analyze.prototype.validateFolderStructure = function(path) {
  
  var fileNames = fs.readdirSync(path);

  fileNames.forEach(function(file){

      var stats = fs.statSync(path + file);

      if(stats.isFile()) {
        console.log("Path: " + path);
        throw new Error("Todos os arquivos de traces devem estar organizados em estruturas de pastas. Sendo que a pasta deve possuir o nome do experimento.")
      }
    });
};

Analyze.prototype.getAggregatedGoodPutPerExecutionOrderedByExperiment = function() {
  
  var that = this;
  var experimentsIds = Object.getOwnPropertyNames(this._experiments);

  var results = [];

  if(experimentsIds.length > 0) {

    experimentsIds.forEach(function(experimentId){

      var experiment = that._experiments[experimentId];      

      var result = {
        name : experiment._name,
        data: experiment.getAggregatedGoodPutPerExecution()
      }

      results.push(result);
    });
    
  }

  return results;
};

Analyze.prototype.getAggregatedPacketLossRatePerExecutionOrderedByExperiment = function() {

  var that = this;
  var experimentsIds = Object.getOwnPropertyNames(this._experiments);

  if(experimentsIds.length > 0) {

    var results = [];

    experimentsIds.forEach(function(experimentId){

      var experiment = that._experiments[experimentId];      
      results.push(experiment.getAggregatedPacketLossRate());
    });
    
  }

  return results;
};

Analyze.prototype.getAggregatedGoodPutOfAllExecutions = function() {

  var that = this;
  var experimentsIds = Object.getOwnPropertyNames(this._experiments);

  if(experimentsIds.length > 0) {

    var results = [];

    experimentsIds.forEach(function(experimentId){

      var experiment = that._experiments[experimentId];

      results.push(experiment.calculateAverageOfAggregatedGoodPutOfAllExecutions());
    });
    
  }

  return results;

};

Analyze.prototype.start = function() {
  
  var that = this;
  var experimentsIds = Object.getOwnPropertyNames(this._experiments);

  if(experimentsIds.length > 0) {

    var results = [];

    experimentsIds.forEach(function(experimentId){

      var experiment = that._experiments[experimentId];
      experiment.executeAnalysis();
    });
    
  }

};

module.exports = Analyze;