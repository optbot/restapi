OptBot REST API
===============
Description
--
RESTful API for the optbot service.

Build
--
1.  Install [Node and npm](https://nodejs.org/download/). In Linux, `npm` may require a separate install, 
    as described [here](https://docs.npmjs.com/getting-started/installing-node). 
2.  Build the app:

        $ cd <project root>
        $ npm install

3.  Verify that dependencies have been built to `<project root>/node_modules/`

4.	Have a working and running copy of the MongoDB with some data in the 'quotes' collection.

Run
--
1.  Start the Node server (notice the `--` for optional args):

        $ npm start [-- [--port=your_port] [--host=your_host]]

2.  Select an available equity, strike price, option type, and expiry. Navigate to the page (unless overridden) at:

		http://127.0.0.1:8081/api/?equity=SCTY&option=call&strike=30&expiry=2015-4-9