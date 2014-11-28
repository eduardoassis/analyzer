(function() {

  require({
    urlArgs: "b=" + ((new Date()).getTime()),
    paths: {
      jquery: 'vendor/jquery/jquery',
      exporting: 'vendor/chart/exporting',
      highcharts: 'vendor/chart/highcharts'   
    }
  }, ['app/utils/ChartManager'], function(ChartManager){

  });

}).call(this);


/*, ['app/example-view'], function(ExampleView) {
    var view = new ExampleView();
    view.render('body');
  }*/