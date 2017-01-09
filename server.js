var http = require("http")
var express = require("express");
var app = express();


app.get('/webhook', function(req, res) {
	console.log(req.query);
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === "msccs35") {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});


app.listen(9000)