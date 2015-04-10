var config = require('./config/config.js'),
    express = require('express'),
    app = express();

var apiRouter = require('./routes/api.js');
app.use('/api', apiRouter);

// Not found (404) http://expressjs.com/starter/faq.html
app.use(function (req, res, next) {
    res.status(404).send('Not found');
});

// Unhandled errors (500) http://expressjs.com/starter/faq.html
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Error');
});

var server = app.listen(config.web.port, config.web.host, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port)
});