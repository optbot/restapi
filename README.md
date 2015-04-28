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

	$ sudo npm start

###Configuration

To configure settings, this package uses the `npm config` options detailed [here](https://docs.npmjs.com/files/package.json#config).

###Examples

To change the listening port

	$ sudo npm config set @optbot/restapi:port 18081 --global

To change the bound host

	$ sudo npm config set @optbot/restapi:host 127.0.0.1 --global

Testing
--
If the service is running on port `8081` on a host with IP address `91.198.174.192`, navigate to the following REST endpoint in a web browser:

	http://91.198.174.192:8081/api/options?equity=SCTY&option=call&strike=30&expiry=2015-4-9

You can replace query string parameters as needed to query for suitable data.

If no data is being returned, it may be that the database connection string is improperly configured. As outlined in the **Connects To** section, this project currently requires a database called `optionsMkt` with a collection named `quotes`. To reconfigure this, you can issue the following command:

	$ npm config set @optbot/restapi:db:optionsMkt "mongodb://<your_mongo_host>:<your_mongo_port>/<your_database_name>" --global

As an example, using the default settings would be

	$ npm config set @optbot/restapi:db:optionsMkt "mongodb://localhost:27017/optionsMkt" --global

### Code conformity
    $ jshint lib
    $ jscs .

Connects To
--
[optbot/mongo](https://github.com/optbot/mongo) database named `optionsMkt` with a populated `quotes` collection.