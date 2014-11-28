var fs = require("fs");
var Flow = require('./Flow.js');
var Node = require('./Node.js');
var RegexUtils = require('./Regex.js');

var Execution = function (id, fileLines) {
	
  this._id = id;
  this._fileLines = fileLines;
  this._analyzed = false;

	this._flows = {};
  this._numbersOfFlows = 0;

  this._nodes = {};
  this._numbersOfNodes = 0;

  this._aggregatedGoodPut = 0;
  this._aggregatedThroughput = 0;
  this._aggregatedPacketLossRate = 0;

  this.flow;  
  this.packetId;
  this.typeEvent;  
  this.timeEvent;
  this.playLoadSize;
  this.sourceIp;
  this.targetIp;
  this.idFlow;
  this.nodeId;

	this.hasFlow = function(idFlow) {
		return this._flows[idFlow] ? true : false;
	}

  this.hasNode = function(nodeId) {
    return this._nodes[nodeId] ? true : false;
  }
};

Execution.prototype.getFlows = function() {

	return this._flows;
}

Execution.prototype.getFlowById = function(idFlow) {
	return this._flows[idFlow];
}

Execution.prototype.flagAsAnalyzed = function () {
  this._analyzed = true;
}

Execution.prototype.exectuionAnalyzed = function() {
  return this._analyzed;
}

Execution.prototype.addFlow = function(flow) {
  
  this._flows[flow.getId()] = flow;
  this._numbersOfFlows += 1;  
}

Execution.prototype.updateFlow = function(flow) {
  
  if(this.hasFlow(flow.getId()))
    this._flows[flow.getId()] = flow;
}

Execution.prototype.getNodeById = function(nodeId) {
  return this._nodes[nodeId];
}

Execution.prototype.addNode = function(node) {

  this._nodes[node.getId()] = node;
  this._numbersOfNodes += 1;
}

Execution.prototype.updateNode = function(node) {
  
  if(this.hasNode(node.getId()))
    this._nodes[node.getId()] = node;
};

Execution.prototype.readLine = function(line) {

  this.typeEvent = RegexUtils.getTypeEventFromLine(line);

  this.idFlow = RegexUtils.getIdFlowFromLine(line);

  this.sourceIp = RegexUtils.getSourceIpFromLine(line);

  this.targetIp = RegexUtils.getTargetIpFromLine(line);

  this.playLoadSize = RegexUtils.getPlayLoadFromLine(line);

  this.timeEvent = RegexUtils.getTimeFromLine(line);
  
  this.packetId = RegexUtils.getPacketIdFromLine(line);

  this.nodeId = RegexUtils.getNodeList(line);
}

Execution.prototype.createOrUpdateFlow = function(line) {

  this.readLine(line);

  this.createOrUpdateNode(line);

  var flow = null;

  if (!this.hasFlow(this.idFlow))
    this.addFlow(new Flow(this.idFlow, this.sourceIp, this.targetIp, this.timeEvent, this.timeEvent));

  flow = this.getFlowById(this.idFlow);

  if(flow.hasOwnProperty(this.typeEvent)) {
    
    flow[this.typeEvent](this.playLoadSize, this.packetId);      
  }

  flow.setFinalTime(this.timeEvent);
  this.updateFlow(flow);
}

Execution.prototype.createOrUpdateNode = function(line) {
  
  this.readLine(line);

  var node = null;

  if(!this.hasNode(this.nodeId))
    this.addNode(new Node(this.nodeId))

  node = this.getNodeById(this.nodeId);

  if(node.hasOwnProperty(this.typeEvent))
    node[this.typeEvent](this.playLoadSize);

  this.updateNode(node);

};

Execution.prototype.analyze = function() {
  
  if(!this.exectuionAnalyzed()) {

    for(i in this._fileLines) {

      if(this._fileLines[i]) {
        this.createOrUpdateFlow(this._fileLines[i]);
      }
        
    }

    this._flows = this.calculateMetricsPerFlow();
    this.flagAsAnalyzed();

  }
};

Execution.prototype.calculateAggregatedGoodPut = function(flow) {

  if (flow) {
    this._aggregatedGoodPut += flow._goodput;

  };
}

Execution.prototype.calculateAggregatedThroughput = function(flow) {

  if (flow) {
    this._aggregatedThroughput += flow._throughput;
  };
}

Execution.prototype.addAggregatedPacketLossRateToAggregatedValue = function(flow) {

  var lossRate = flow.getLossRate();
  this._aggregatedPacketLossRate += typeof lossRate && lossRate > 0 ? lossRate : 0;

};

Execution.prototype.initializeVariables = function() {
  this._aggregatedPacketLossRate = 0;
};

Execution.prototype.calculateMetricsPerFlow = function() {
  
    var that = this;

    that.initializeVariables();

    var flowsIds = Object.getOwnPropertyNames(this._flows);

    var flow;
    var flows = [];

    flowsIds.forEach(function(flowId){

      flow = that.getFlowById(flowId);

      flow.setExecutionTime();           

      flow.calculateThroughput();
      flow.calculateGoodput();
      flow.calculatePacketLossRate();

      that.calculateAggregatedGoodPut(flow);
      that.addAggregatedPacketLossRateToAggregatedValue(flow);
      
      flows.push(flow);

    });

    that._aggregatedPacketLossRate = this._aggregatedPacketLossRate / this._numbersOfFlows;

    return flows;
}

module.exports = Execution;