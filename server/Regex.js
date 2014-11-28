
var RegexUtils = {};

RegexUtils.regexTypeEvent = /\bEnqueue|\bMacRx|\bDequeue|\bPhyRxDrop/;
RegexUtils.packetId = /\bid\s(\d+)/;
RegexUtils.regTime = /[\+|\-|d|r]\s(\d+(\.)?(\d+)?)/;
RegexUtils.regexPlayLoad = /\bsize=(\d+)|\bFragment\s\[(\d+):(\d+)\]/;
RegexUtils.regexIps = /(\d+\.\d+\.\d+\.\d+)\s\>\s(\d+\.\d+\.\d+\.\d+)/;
RegexUtils.regReceiveEvent = new RegExp("MacRx");
RegexUtils.regNodeList = /\/\bNodeList\/(\d+)/;
RegexUtils.regDeviceList = /\/\bDeviceList\/(\d+)/;


RegexUtils.getPacketIdFromLine = function(line) {

	var result = RegexUtils.packetId.exec(line);
	return result[1];
}

RegexUtils.getTypeEventFromLine = function(line) {

	var result = RegexUtils.regexTypeEvent.exec(line);
	return result ? result[0] : null;
};

RegexUtils.getIdFlowFromLine = function(line) {
	
	var result = RegexUtils.regexIps.exec(line);
	return result[0];
};

RegexUtils.getSourceIpFromLine = function(line) {

	var result = RegexUtils.regexIps.exec(line);

	return result[1];
};

RegexUtils.getTargetIpFromLine = function(line) {

	var result = RegexUtils.regexIps.exec(line);
	return result[2];
};

RegexUtils.getPlayLoadFromLine = function(line) {

	var result = RegexUtils.regexPlayLoad.exec(line);
	return parseFloat(result ? (result[1] ? result[1] : result[2]) : 0);
};

RegexUtils.getTimeFromLine = function(line) {

	var result = RegexUtils.regTime.exec(line);
	return parseFloat(result ? result[1] : null);
};

RegexUtils.getNodeList = function(line) {

	var result = RegexUtils.regNodeList.exec(line);
	return result ? result[1] : null;
};

module.exports = RegexUtils;