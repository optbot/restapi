var config = {};
config.web = {};

config.web.host = process.env.HOST || '127.0.0.1';
config.web.port = process.env.PORT || 8081;

module.exports = config;