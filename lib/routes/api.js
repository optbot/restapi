var querystring = require('querystring');
var moment = require('moment');
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;

var dbConn = process.env.npm_package_config_db_optionsMkt;

// Connects to Mongo optionsMkt database then selects the quotes collection.
var quotesCol = function(cb) {
  mongoClient.connect(dbConn, function(err, db) {
    db.collection('quotes', function(err, quotes) {
      cb(err, quotes, db);
    });
  });
};

var appendExpiryArgsFromDateString = function(query, expiry) {
  // Parse the provided date/time.
  var expiryMoment = moment.utc(expiry, 'M/D/YYYY');

  // Set the beginning of the day.
  var expiryBegin = expiryMoment.clone();
  expiryBegin.hours(0).minutes(0).seconds(0).milliseconds(0);

  // Set the end of the day provided by going ahead one day then back one millisecond.
  var expiryEnd = expiryBegin.clone();
  expiryEnd.add(1, 'days').subtract(1, 'milliseconds');

  query.Expiry = {
    $gte: expiryBegin.toDate(),
    $lt: expiryEnd.toDate()
  };
};

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

/**
 * Strikes EP
 */
router.get('/strikes', function(req, res, next) {
  var equity = req.query.equity;
  var option = req.query.option;
  if (!equity || !option) {
    res.status('403').json({error: 'Missing required query parameters'});
    return;
  }

  quotesCol(function(err, quotes, db) {
    var query = {Underlying: equity, Opt_Type: option};

    quotes.distinct('Strike', query, function(err, results) {
      db.close();
      res.json({strikes: results});
    });
  });
});

/**
 * Expiries EP
 */
router.get('/expiries', function(req, res, next) {
  var equity = req.query.equity;
  var option = req.query.option;
  var strike = req.query.strike;
  if (!equity || !option || !strike) {
    res.status('403').json({error: 'Missing required query parameters'});
    return;
  }

  strike = parseFloat(strike);

  quotesCol(function(err, quotes, db) {
    var query = {Underlying: equity, Opt_Type: option, Strike: strike};

    quotes.distinct('Expiry', query, function(err, results) {
      db.close();
      res.json({expiries: results});
    });
  });
});

/**
 * Options EP
 */
router.get('/options', function(req, res, next) {
  var equity = req.query.equity;
  var option = req.query.option;
  var strike = req.query.strike;
  var expiry = req.query.expiry;
  if (!equity || !option || !strike || !expiry) {
    res.status('403').json({error: 'Missing required query parameters'});
    return;
  }

  strike = parseFloat(strike);

  quotesCol(function(err, quotes, db) {
    var query = {
      Underlying: equity,
      Strike: strike,
      Opt_Type: option
    };
    appendExpiryArgsFromDateString(query, expiry);

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
      if (!docs || (docs && docs.length === 0)) {
        docs = [];
      }
      res.json({options: docs});
    });
  });
});

module.exports = router;
