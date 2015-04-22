OptBot REST API
===============
Description
--
RESTful API for the optbot service.

Usage
--

###Install

	$ npm install

###Run

	$ npm start

###Configuration

To configure settings, this package uses the `npm config` options detailed [here](https://docs.npmjs.com/files/package.json#config).

###Examples

To change the listening port

	$ npm config set @optbot/restapi:port 18081 --global

To change the bound host

	$ npm config set @optbot/restapi:host 127.0.0.1 --global

Testing
--
If the service is running on port `8081` on a host with IP address `91.198.174.192`, navigate to the following REST endpoint in a web browser:

	http://91.198.174.192:8081/api/?equity=SCTY&option=call&strike=30&expiry=2015-4-9

You can replace query string parameters as needed to query for suitable data.


Connects To
--
[optbot/mongo](https://github.com/optbot/mongo) with a populated `quotes` collection.