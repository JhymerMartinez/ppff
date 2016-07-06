(function () {
  'use strict';

  var express = require('express'),
      app = express();

  // Force use SSL
  if (!!process.env.FORCE_HTTPS) {
    var enforce = require('express-sslify');
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }

  app.use(express.static('app'));
  app.set('port', process.env.PORT || 5001);
  app.listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port'));
  });
})();
