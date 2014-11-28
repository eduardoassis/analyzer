var fs = require("fs"); 
var lineReader = require('line-reader');
var Execution = require('./Execution.js');
var Flow = require('./Flow.js');
var RegexUtils = require('./Regex.js');
var MathUtils = require('./utils/MathUtils.js');


var Experiment = function(id, name, path, fileNames) {
	
  this._id = id;
  this._name = name;
	this._path = path;
	this._fileNames = fileNames;
	this._executions = {};
  this._analyzed = false;
  this._numberOfExecutions = 0;
  this._averagePacketLoss = 0;
}

Experiment.prototype.executeAnalysis = function() {

  if(!this._analyzed) {

  	for (var i = 0; i < this._fileNames.length; i++) {

    		var fileName = this._fileNames[i];

    		var fileLines = fs.readFileSync(this._path + "/" + fileName).toString().split("\n");

    		if(fileLines) {
    			
    			var execution = new Execution(i + 1, fileLines);
    			execution.analyze();          

    			this._executions[i] = execution;  
          this._numberOfExecutions += 1;
    		}
  	};

    this._analyzed = true;
  }

};

Experiment.prototype.getAggregatedGoodPutPerExecution = function() {
  
  this.executeAnalysis();

  var exectutions = [];

  var props = Object.getOwnPropertyNames(this._executions);


  for(var prop in props) {

    var execution = this._executions[prop];

    var dataOfExecution = [];

    dataOfExecution.push(execution._id);
    dataOfExecution.push(MathUtils.convertBytesToMegabyte(execution._aggregatedGoodPut));

    exectutions.push(dataOfExecution);
  }

  return exectutions;
};

Experiment.prototype.getAggregatedPacketLossRate = function(first_argument) {
  
  this.executeAnalysis();

  var result = {};
  var aggretedResult = 0;
  var valuesOfAggregatedPacketLossRate = [];

  result.name = this._name;

  var props = Object.getOwnPropertyNames(this._executions);


  for(var prop in props) {

    var execution = this._executions[prop];
    aggretedResult += execution._aggregatedPacketLossRate;
    valuesOfAggregatedPacketLossRate.push(execution._aggregatedPacketLossRate);
  }

  this._averagePacketLoss = aggretedResult / this._numberOfExecutions;

  var data = [];
  data.push(this._averagePacketLoss);

  var standardDeviation = MathUtils.calculateStandardDeviation(valuesOfAggregatedPacketLossRate, this._averagePacketLoss);

  data.push(standardDeviation);
  result.data = data

  return result;
  
};

Experiment.prototype.calculateStandardDeviation = function(numbers, average) {
  
  var result, 
      aux = 0;

  if (Array.isArray(numbers) && numbers.length > 0) {

    numbers.forEach(function(number){
      aux += Math.pow((number - average), 2);      
    });

    result = Math.sqrt( ( (1 / (numbers.length - 1) ) * aux ) );
  }

  return result;
};

Experiment.prototype.calculateAverageOfAggregatedGoodPutOfAllExecutions = function(exectution) {
  
  this.executeAnalysis();

  var result = {};
  var goodPutAggregatedOfAllExecutions = 0;
  var valuesOfAggregatedGoodput = [];

  var aggretedResult = 0;

  var data = [];

  result.name = this._name;

  var props = Object.getOwnPropertyNames(this._executions);

  
  for(var prop in props) {

    var execution = this._executions[prop];
    goodPutAggregatedOfAllExecutions += MathUtils.convertBytesToMegabyte(execution._aggregatedGoodPut);
    valuesOfAggregatedGoodput.push(MathUtils.convertBytesToMegabyte(execution._aggregatedGoodPut));
  }

  var averageGoodput = goodPutAggregatedOfAllExecutions / this._numberOfExecutions;

  data.push(averageGoodput);

  result.data = data;

  var standardDeviation = MathUtils.calculateStandardDeviation(valuesOfAggregatedGoodput, averageGoodput);

  data.push(standardDeviation);
  result.data = data

  return result;

  return result;
};

module.exports = Experiment;