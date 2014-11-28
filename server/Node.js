var Packet = require('./Packet.js');

var Node = function (id) {
	this._id = id;

	this._sentPackets = 0;
	this._receivedPackets = 0;
	this._droppedPackets = 0;

	this.Enqueue = function(bytes) {

		this.increaseSentPackts();
	}

	this.MacRx = function(bytes) {

		this.increaseReceivedPackts();
	}

	this.Dequeue = function(bytes) {
		
	}

	this.PhyRxDrop = function(bytes) {

		this.increaseDroppedPackts();
	}

}

Node.prototype.getId = function() {
	return this._id;
};

Node.prototype.increaseSentPackts = function() {
	this._sentPackets += 1;
};

Node.prototype.increaseReceivedPackts = function() {
	this._receivedPackets += 1;
};

Node.prototype.increaseDroppedPackts = function() {
	this._droppedPackets += 1;
};

module.exports = Node;