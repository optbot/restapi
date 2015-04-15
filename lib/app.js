(function () {
    'use strict'

    var argv = require('yargs').argv
    
    process.env.NODE_ENV = argv.env || 'production'
    
    var config = require('./config/config.js'),
        express = require('express'),
        app = express()
    
    var host = argv.host || config.web.host
    var port = argv.port || config.web.port
    
    var apiRouter = require('./routes/api.js')
    app.use('/api', apiRouter)
    
    // Not found (404) http://expressjs.com/starter/faq.html
    app.use(function (req, res, next) {
        res.status(404).send('Not found')
    })
    
    // Unhandled errors (500) http://expressjs.com/starter/faq.html
    app.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500).send('Error')
    })
    
    var server = app.listen(port, host, function () {
        var host = server.address().address
        var port = server.address().port
        
        console.log('Express server started at http://%s:%s', host, port)
    })
})()