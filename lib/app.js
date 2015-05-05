(function() {
  'use strict';

  var path = require('path');
  var express = require('express');
  var app = express();

  var apiRouter = require('./routes/api.js');
  app.use('/api', apiRouter);

  // Not found (404) http://expressjs.com/starter/faq.html
  app.use(function(req, res, next) {
    res.status(404).send('Not found');
  });

  // Unhandled errors (500) http://expressjs.com/starter/faq.html
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Error');
  });

  var server = app.listen(process.env.npm_package_config_port,
    process.env.npm_package_config_host,
    function() {
      var host = server.address().address;
      var port = server.address().port;

      console.log('Express server started at http://%s:%s', host, port);
    }
  );

  // This function is called when you want the server to die gracefully.
  // i.e. wait for existing connections
  var gracefulShutdown = function() {
    console.log('Received kill signal, shutting down gracefully.');
    server.close(function() {
      var msg = 'Server shutting down...';
      console.info(msg);
      log.info(msg);
      process.exit();
    });

    // Just to be safe, we also impose a ten second maximum shutdown time
    // because some browsers keep the sockets open for a prolonged period.
    setTimeout(function() {
      var errMsg =
 'Could not close connections in time, forcefully shutting down!';

      console.error(errMsg);
      process.exit();
    }, 10 * 1000);
  };

  // Listen for TERM signal .e.g. kill. (forever uses this approach)
  process.on('SIGTERM', gracefulShutdown);

  // Listen for INT signal e.g. Ctrl-C
  process.on('SIGINT', gracefulShutdown);
})();
