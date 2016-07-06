(function () {
  'use strict';

  var express = require('express'),
      app = express(),
      enforce = require('express-sslify');

  app.use(enforce.HTTPS());
  app.use(express.static('app'));
  app.set('port', process.env.PORT || 5001);
  app.listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port'));
  });
})();
