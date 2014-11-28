	var ChartManager = function() {	
	}

	ChartManager.prototype.plotSplineIrregularTime = function(graphicTitle, graphicSutTitle, titleYAxis, titleXAxis, series) {      		

		$(function () {
	        $('#container').highcharts({
	            chart: {
	                type: 'spline'
	            },
	            title: {
	                text: graphicTitle
	            },
	            subtitle: {
	                text: graphicSutTitle
	            },
	            xAxis: {
	                type: 'number',
	                labels: {
	                    formatter: function() {
	                        return this.value;
	                    }
	                },

	                title: {
	                    text: titleXAxis
	                }
	            },
	            yAxis: {
	                title: {
	                    text: titleYAxis
	                },
	                min: 0
	            },
	            tooltip: {
	                headerFormat: '<b>{series.name}</b><br>',
	                pointFormat: 'Execução {point.x}: {point.y} Mb/s'
	            },

	            series: series
	        });
    	});
		
	};

	ChartManager.prototype.plotColumnBasic = function(graphicTitle, graphicSubTitle, categories, titleYAxis, series, unidadeDeMedida) {

		var unidade = unidadeDeMedida ? unidadeDeMedida : 'Mb/s';

        $(function () {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: graphicTitle
            },
            subtitle: {
                text: graphicSubTitle
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: titleYAxis
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} '+ unidade +'</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: series
        });
    });


	}