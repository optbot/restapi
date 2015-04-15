var config = {}
config.web = {}

config.web.host = process.env.HOST
config.web.port = process.env.PORT || 8081

module.exports = config