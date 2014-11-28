	
	var GoodputAggregatedControoller = function() {
		this._result = null;
	}

	GoodputAggregatedControoller.prototype.setResult = function(result) {
		this._result = result;
	};

	GoodputAggregatedControoller.prototype.getAnalysisGoodPut = function() {

		var that = this;
	
		var response = $.get("http://localhost:3000/goodputAggregatedOfAllExecutions");

		response.done(function(data) {
    		that.setResult(data);
    		that.createReport();
  		}).fail(function() {
  			console.log("Erro durante consulta.");
  		}).always(function() {
    		
	  	});
	};

	GoodputAggregatedControoller.prototype.createReport = function() {

		var manager = new ChartManager();
		manager.plotColumnBasic('Vazão Agregada por experimento', 'Média da Vazão por experimento e seus respectivos desvios padrões', ['Vazão média', 'Desvio padrão'], 'Vazão', this._result);
	}	