	
	var GoodputController = function() {
		this._result = null;
	}

	GoodputController.prototype.setResult = function(result) {
		this._result = result;
	};

	GoodputController.prototype.getAnalysisGoodPut = function() {

		var that = this;
	
		var response = $.get("http://localhost:3000/goodputAggregated");

		response.done(function(data) {
    		that.setResult(data);
    		that.createReport();
  		}).fail(function() {
  			console.log("Erro durante consulta.");
  		}).always(function() {
    		
	  	});
	};

	GoodputController.prototype.createReport = function() {
		var manager = new ChartManager();
		manager.plotSplineIrregularTime('Vazão Agregada por fluxo em cada execução', '', 'Vazão', 'Execuçoes', this._result);
	}	