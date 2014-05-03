define(['jquery', 'templates'], function($, templates) {
  var HeaderView = (function() {

    function HeaderView() {}

    HeaderView.prototype.render = function(element) {      
      $(element).append(templates['header']({name: 'Jade'}));
    };

    return HeaderView;

  })();
  return HeaderView;
});