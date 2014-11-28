
var LossRateController = function() {
	this._result = null;
}

LossRateController.prototype.setResult = function(result) {
	this._result = result;
};

LossRateController.prototype.getAnalysisLossRateAggregated = function() {

	var that = this;

	$.getJSON("http://localhost:3000/lossRateAggregated")
	.done(function(data) {

		that.setResult(data);
		that.createReport();

		}).fail(function() {
			console.log("Erro durante consulta.");
		}).always(function() {
		
  	});
};

LossRateController.prototype.createReport = function() {
	
	var manager = new ChartManager();
	manager.plotColumnBasic('Taxa de Perda', 'Taxa de perda por experimento e seus respectivos desvios padrões', ['Taxa de perda média', 'Desvio padrão'], 'Percentual de pacotes', this._result, '%');
}	