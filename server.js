var express = require('express'),
    routes = require('./routes'),
    engines = require('consolidate'),
    fs = require("fs"),
    TopCube = require('topcube'),
    ExperimentController = ( __dirname + '/server/ExperimentController.js');

    var Experiment = require(__dirname + '/server/Experiment.js');
    var Analyze = require(__dirname + '/server/Analyze.js');
    var path = "/media/eduardo/e224e050-3480-44c8-9e3d-1aa15dc39354/eduardo/Dropbox/workspace/metricas/traces/Experimento 1/";
    //var path = "/home/eduardo/Dropbox/workspace/metricas/traces/";
    global.analyze = global.analyze || new Analyze();
    
exports.startServer = function(config, callback) {

  var analyze = analyze || new Analyze();
  var port = process.env.PORT || config.server.port;


  var app = express();

  var server = app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
  });

  app.configure(function() {
    app.set('port', port);
    app.set('views', config.server.views.path);
    app.engine(config.server.views.extension, engines[config.server.views.compileWith]);
    app.set('view engine', config.server.views.extension);
    app.use(express.favicon());
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(express.compress());
    app.use(config.server.base, app.router);
    app.use(express.static(config.watch.compiledDir));
  });

  routes(app);

  app.configure('development', function() {
    app.use(express.errorHandler());
  });
  
  callback(server);
};

/*
TopCube({
  url: 'http://localhost:3000/home',
  name: 'Analyzer',
  width: 1024,
  height: 700
});*/