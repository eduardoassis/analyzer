var Packet = require('./Packet.js');

var Flow = function (id, sourceIp, targetIp, startTime, finalTime) {

	this._id = id;
	this._sourceIp = sourceIp;
	this._targetIp = targetIp;
	this._startTime = startTime;
	this._finalTime = finalTime;
	this._sentBytes = 0;
	this._receivedBytes = 0;
	this._lostBytes = 0;
	this._sentPackets = 0;
	this._receivedPackets = 0;
	this._lostPackets = 0;
	this._timeOfExecution = 0;

	this._throughput = 0;
	this._goodput = 0;
	this._lossRate = 0;

	this._packets = {};


	// nº pacotes enviados e recebidos
	// Para mais funções relacionadas aos eventos, bas adicionar aqui um método equivalente 
	// ao evento capturado pela regex.

	this.Enqueue = function(bytes, packetId) {

		this.setSentBytes(bytes);

		this._sentPackets += 1;		

		if(packetId)
			this.setPacket(packetId);
	}

	this.MacRx = function(bytes, packetId) {

		this.setReceivedBytes(bytes);
		this._receivedPackets += 1;

		if(packetId)
			this.setPacket(packetId);
	}

	this.PhyRxDrop = function(bytes, packetId) {

		this.setLostBytes(bytes);
		this._lostPackets += 1;

		if(packetId)
			this.setPacket(packetId);
	}
}

Flow.prototype.setPacket = function(packetId) {
	
	var packet;

	if (!this.hasPacket(packetId)) {

				
		packet = new Packet(packetId, this._sourceIp, this._targetIp, this._finalTime);		
		
	}
	else {

		packet = this._packets[packetId];

		if( this.isOwnerOfPacket( packet ) ) {

			packet.setReceivedTime(this._finalTime);
		}
	}

	this._packets[packetId] = packet;
};

Flow.prototype.isOwnerOfPacket = function(packet) {
	
	return this._sourceIp === packet.getSourceIp() && this._targetIp === packet.getTargetIp();

};

Flow.prototype.hasPacket = function(packetId) {
	return this._packets[packetId] ? true : false;
};

Flow.prototype.setStartTime = function(startTime) {

	if (this._startTime == undefined) {
    	this._startTime = startTime;
  	};	
};

Flow.prototype.setTargetIp = function(targetIp) {
	this._targetIp = targetIp;
};


Flow.prototype.setFinalTime = function(finalTime) {
	this._finalTime = finalTime;
};

Flow.prototype.getStartTime = function() {
	return this._startTime;
};

Flow.prototype.getId = function () {
	return _id;
};

Flow.prototype.getPackets = function() {
	return this._packets;
};

Flow.prototype.getPacketById = function(packetId) {
	
	return this._packets[packetId];
};

Flow.prototype.setSourceIp = function(sourceIp) {
	this._sourceIp = sourceIp;
}


Flow.prototype.getId = function() {
return this._id;
}

Flow.prototype.setSentBytes = function(bytes) {

	if (typeof bytes == 'number' ) {
		this._sentBytes += parseFloat(bytes);
	};	
}

Flow.prototype.setReceivedBytes = function(bytes) {

	if (typeof bytes == 'number' ) {

		this._receivedBytes += parseFloat(bytes);
	};	
}

Flow.prototype.setLostBytes = function(bytes) {

	if (typeof bytes == 'number' ) {
		this._lostBytes += parseFloat(bytes);
	};	
}

Flow.prototype.setExecutionTime = function() {

	var result = this._finalTime - this._startTime;
	this._timeOfExecution = parseFloat(result);
}

Flow.prototype.calculateThroughput = function() {

	var result = this._sentBytes / this._timeOfExecution;
	this._throughput = parseFloat(result);
}

Flow.prototype.calculateGoodput = function() {

	var result = this._receivedBytes / this._timeOfExecution;
	this._goodput = parseFloat(result);			
}

Flow.prototype.calculatePacketLossRate = function() {
	
	if(this._sentPackets > 0) {		

		this._lossRate = (this._lostBytes * 100) / this._sentBytes;
	}
};

Flow.prototype.getLossRate = function() {
	return this._lossRate;
};

module.exports = Flow;