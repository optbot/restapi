var querystring = require('querystring');
var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  var equity = req.query.equity;
  var strike = req.query.strike;
  var option = req.query.option;
  var expiry = req.query.expiry;
  if (!equity || !strike || !option || !expiry) {
    res.status('403').json({error: 'Missing required query parameters'});
  }

  // Parse the provided date/time.
  strike = parseFloat(strike);
  var expiryMillis = Date.parse(expiry);
  expiry = new Date();
  expiry.setTime(expiryMillis);

  // Set the beginning of the day provided.
  var expiryBegin = new Date(
    expiry.getFullYear(),
    expiry.getUTCMonth(),
    expiry.getUTCDate()
  );
  expiryBegin.setUTCHours(0, 0, 0, 0);

  // Set the end of the day provided by going ahead one day then back one millisecond.
  var expiryEnd = new Date(
    expiryBegin.getFullYear(),
    expiryBegin.getUTCMonth(),
    expiryBegin.getUTCDate() + 1);
  expiryEnd.setUTCHours(0, 0, 0, 0);
  expiryEnd.setUTCMilliseconds(expiryBegin.getUTCMilliseconds() - 1);

  MongoClient.connect(
    process.env.npm_package_config_db_optionsMkt,
    function(err, db) {
      var quotes = db.collection('quotes');

      var query = {
        Underlying: equity,
        Strike: strike,
        Opt_Type: option,
        Expiry: {
          $gte: expiryBegin,
          $lt: expiryEnd
        }
      };

      var project = {
        _id: 0,
        Quote_Time: 1,
        Strike: 1,
        Ask: 1,
        Bid: 1,
        Last: 1
      };

      quotes.find(query, project).toArray(function(err, docs) {
        db.close();

        if (!docs || docs.length === 0) {
          docs = {};
        }

        res.jsonp(docs);
      });
    }
  );
});

module.exports = router;
