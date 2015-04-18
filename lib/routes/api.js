var config = require('../config/config.js'),
    querystring = require('querystring'),
    express = require('express'),
    router = express.Router()

var MongoClient = require('mongodb').MongoClient

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    next()
})

router.get('/', function (req, res) {
    var equity = req.query.equity
    var strike = req.query.strike
    var option = req.query.option
    var expiry = req.query.expiry
    if (!equity || !strike || !option || !expiry) {
        res.status("403").json({ error: 'Missing required query parameters' })
    }
    
    strike = parseFloat(strike)
    var expiryMillis = Date.parse(expiry)
    expiry = new Date()
    expiry.setTime(expiryMillis)
    
    var url = config.get('db:conn')
    MongoClient.connect(url, function (err, db) {
        var quotes = db.collection('quotes')
        
        var query = {
            Underlying: equity,
            Strike: strike,
            Opt_Type: option,
            Expiry: {
                $gte: expiry
            }
        }
        
        var project = {
            _id: 0,
            Quote_Time: 1,
            Strike: 1,
            Ask: 1,
            Bid: 1,
            Last: 1
        }
        
        quotes.find(query, project).toArray(function (err, docs) {
            db.close()
            
            if (!docs || docs.length === 0) {
                docs = {}
            }
            
            res.jsonp(docs)
        })
    })
})

module.exports = router