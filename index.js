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

// This is middleware called for all routes.
// Middleware takes three parameters.
// Its callback ends with a call to next() to proceed to the next
// middleware, or the actual route.
app.use((req, res, next) => {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
});

// Add a route for the path /
app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname+'/Pages/home.html'));
});
// Add a route for the path /about
app.get("/about", (req, res) => {
  
    res.sendFile(path.join(__dirname+'/pages/arbete.html'));
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



    
      


    function readData() {
        return firebase.database().ref('/Posts').limitToLast(10).then(function(snapshot) {
        //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.info(snapshot.val());
      });
      }
      


});