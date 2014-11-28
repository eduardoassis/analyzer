var fs = require("fs"); 
var lineReader = require('line-reader');
var Analyze = require('./Analyze');
var path = "/media/eduardo/e224e050-3480-44c8-9e3d-1aa15dc39354/eduardo/Dropbox/workspace/metricas/traces/";
//var path = "/home/eduardo/Dropbox/workspace/metricas/traces";

var analyze = new Analyze();

console.log(analyze.getAggregatedPacketLossRatePerExecutionOrderedByExperiment());


/*
var readPath = function(path) {
  var fileNames = fs.readdirSync(path);
  console.log(fileNames);
  //this.createExperiment(path, fileNames);
};

var readPaths = function (path, readPath) {
  
  fs.readdir(path, function(err, files) {

    files.forEach(function(file){

      fs.stat(path + '/' + file, function(err, stats) {

        if(stats.isDirectory()) {
          readPath(path + '/' + file, readPath);
        }
      });

    });

  });
}

var validateFolderStructure = function(path) {
  
  fs.readdir(path, function(err, files) {

    files.forEach(function(file){

      fs.stat(path + '/' + file, function(err, stats) {

        if(stats.isFile()) {
          throw new Error("Todos os arquivos de traces devem estar organizados em estruturas de pastas. Sendo que a pasta deve possuir o nome do experimento.")
        }

      });

    });

  });
  
};

validateFolderStructure(path);

readPaths(path, readPath);
*/