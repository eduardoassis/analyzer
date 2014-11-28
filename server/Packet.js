var Packet = function (id, sourceIp, targetIp, sentTime) {

	this._id = id;
	this._sourceIp = sourceIp;
	this._targetIp = targetIp;
	this._sentTime = sentTime;
	this._receivedTime;

}

Packet.prototype.getSourceIp = function() {
	return this._sourceIp;
};

Packet.prototype.getTargetIp = function() {
	return this._targetIp;
};

Packet.prototype.setSourceIp = function(sourceIp) {
	this._sourceIp = sourceIp;
};

Packet.prototype.setTargetIp = function(targetIp) {
	this._targetIp = targetIp;
};

Packet.prototype.setSentTime = function(sentTime) {
	this._sentTime = sentTime;
};

Packet.prototype.setReceivedTime = function(receivedTime) {
		
	this._receivedTime = parseFloat(receivedTime);	
};

module.exports = Packet;