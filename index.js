/**
 * A sample Express server.
 */
"use strict";


// Set the configuration for your app
  // TODO: Replace with your project's config object
  

// Enable server to run on port selected by the user selected
// environment variable DBWEBB_PORT
const port = process.env.DBWEBB_PORT || 1337;

// Set upp Express server
const express = require("express");
const app = express();
var path = require("path");
var fs = require("fs");
var admin = require("firebase-admin");
const bodyParser = require('body-parser');

var serviceAccount = require("./cloudproject-277415-firebase-adminsdk-w59ih-b6d38fde36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cloudproject-277415.firebaseio.com"
});
// This is middleware called for all routes.
// Middleware takes three parameters.
// Its callback ends with a call to next() to proceed to the next
// middleware, or the actual route.
app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
});

// Add a route for the path /
app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname+'/Pages/login.html'));
});
// Add a route for the path /about
app.post('/delete',  (req, res) => {
  console.log(req.body.snapshot);
  var key = req.body.snapshot;
  let del_ref = admin.database().ref("CloudProject/" + key);
  del_ref.remove()
    .then(function() {
      res.send({ status: 'ok' });
    })
    .catch(function(error) {
      console.log('Error deleting data:', error);
      res.send({ status: 'error', error: error });
    });

});
// Start up server and begin listen to requests
app.listen(port, () => {
    console.info(`Server is listening on port ${port}.`);

    // Show which routes are supported
    console.info("Available routes are:");
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.info(r.route.path);
        }
    });



    
     

});