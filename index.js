/* import express module for providing web framework in node */
const express = require('express');
/* Module to generate web token using different algorithms */
const jwt = require('jsonwebtoken');
/* Declaring variable to get all functions available in express module */
const app = express();
/* create route to generate token */
app.get('/generate-token', (req, res) => {
    const email = req.query.email; //Get email from query parameter
    console.log('Returning Token for email: '+email);
    let generatedToken = jwt.sign({ email: email }, 'shhhhh'); //Generate token synchronously with email
    let token = {"token": generatedToken};
    /* Send the json response as API response */
    res.send(token);
});
/* Create route to validate token */
app.get('/validate-token', (req, res) => {
    const token = req.query.token; //Get token from query parameter
    /* Verifying token asynchronously */
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        let returnedJson = {};
        /* If error in verification of token */
        if(err != null){
            returnedJson["status"] = err.message;
        } else {
            returnedJson["status"] = 'success';
            returnedJson["email"] = decoded.email;
        }
        /* send response back */
        res.send(returnedJson);
    });
});

console.log('Email Token Microservice listening on port 80');
/* Starting app server on port 80 */
app.listen(80);