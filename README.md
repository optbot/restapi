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

###Details

1. You can start the Node server with options (notice the first `--` for optional args):

        $ npm start [-- [--port=your_port] [--host=your_host]]

2. If the service is running on port `8080` on a host with IP address `91.198.174.192`, navigate to the following REST endpoint in a web browser:

		http://91.198.174.192:8080/api/?equity=SCTY&option=call&strike=30&expiry=2015-4-9

3. You can replace query string parameters as needed to query for suitable data.

###Examples

**Start production** (binds to any address, port 8080)

	$ npm start

**Start local** (binds only to local address, port 8080)

	$ npm start -- --host=127.0.0.1

**Start production on a different port** (binds to any address)

	$ npm start -- --port=12345