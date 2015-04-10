OptBot REST API
===============
Description
--
RESTful API for the optbot service.

Build
--
1.  Install [node and npm](https://nodejs.org/download/). In Linux, `npm` may require a separate install, 
    as described [here](https://docs.npmjs.com/getting-started/installing-node). 
2.  Build the app:

        $ cd <project root>
        $ npm install

3.  Verify that dependencies have been built to `<project root>/node_modules/`

Run
--
1.  Start the node server:

        $ cd <project root>
        $ node app.js

2.  Select an available equity, strike price, option type, and expiry to provide values in the form of:

		http://127.0.0.1:8081/api/?equity=SCTY&option=call&strike=30&expiry=2015-4-9