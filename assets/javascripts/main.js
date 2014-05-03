(function() {

  require({
    urlArgs: "b=" + ((new Date()).getTime()),
    paths: {
      jquery: 'vendor/jquery/jquery'
    }
  }, ['app/example-view'], function(HeaderView) {
    var view = new HeaderView();
    view.render('body');
  });

}).call(this);
