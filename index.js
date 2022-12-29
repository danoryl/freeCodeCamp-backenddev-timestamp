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

app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  if (date.match(/\d{5,}/)){
    date = +date;
  }

  let dateUTC = new Date(date).toUTCString();
  if (dateUTC == "Invalid Date") {
    res.json({"error":"Invalid Date"})
  } else {
    let timestamp = new Date(date).getTime();
    res.json({unix: timestamp, utc: dateUTC});
  }
  
});

app.get("/api/", (req, res)=>{
  let dateUTC = new Date().toUTCString();
  let timestamp = new Date().getTime();
  res.json({ unix: timestamp, utc: dateUTC });
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
