var config = require('../config/config.js');
var querystring = require('querystring');
var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', function (req, res) {
    var equity = req.query.equity;
    var strike = req.query.strike;
    var option = req.query.option;
    var expiry = req.query.expiry;
    if (!equity || !strike || !option || !expiry) {
        res.status("403").json({ error: 'Missing required query parameters' });
    }
    
    strike = parseFloat(strike);
    var expiryMillis = Date.parse(expiry);
    expiry = new Date();
    expiry.setTime(expiryMillis);
    
    var url = 'mongodb://localhost:27017/quotes';
    MongoClient.connect(url, function (err, db) {
        var quotes = db.collection('quotes');
    
        var query = {
            Underlying: { $eq: equity },
            Strike: { $eq: strike },
            Opt_Type: { $eq: option }
        };
    
        var project = {
            _id: 0,
            Quote_Time: 1,
            Strike: 1,
            Ask: 1,
            Bid: 1, 
            Last: 1
        };
    
        quotes.find(query, project).toArray(function (err, docs) {
            db.close();
            res.jsonp(docs);
        });
    });
});

module.exports = router;