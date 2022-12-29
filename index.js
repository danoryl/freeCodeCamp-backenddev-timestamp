// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// check if a input is inserted. If so, transform into date and timestamp if valid, or present an error otherwise.
app.get("/api/:date?", function (req, res) {
  
  if (req.params.date == undefined) {
    let dateUTC = new Date().toUTCString();
    let timestamp = new Date().getTime();
    res.json({unix: timestamp, utc: dateUTC});
  } else {
    let date;
    let dateUTC;
    let timestamp;
    if (req.params.date.includes("-")) {
      date = new Date(req.params.date); //not chained to allow check of valid date later
      dateUTC = date.toUTCString();
      timestamp = new Date(req.params.date).getTime();
    } else {
      date = new Date(parseInt(req.params.date));
      dateUTC = date.toUTCString();
      timestamp = parseInt(req.params.date);
    }
    if (!isNaN(date)) {
    res.json({unix: timestamp, utc: dateUTC});
      } else {
      res.json({"error":"Invalid Date"})
      };
    
  }
  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
