//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount,
    }
  };

  request(options, function(error,response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    console.log(price);
    res.write("<p>The current date is " + currentDate + "</>");
    res.write("<h1>The current price of " + amount + crypto + " is currently worth " + price + fiat+ "</h1>");

    res.send();


  });

});



/*
Notes:
- For high level http requests to another server we can use npm request module
- To go from a javascript object to a JSON string we can use the javascript method JSON.stringify(<object>)
- To go from JSON to javascript obect we can use JSON.parse(<object>)
- You are only allowed to do one res.send per request
- To add to the response body, use res.write




*/
