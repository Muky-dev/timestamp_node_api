// server.js
// where your node app starts

// init project
var dotenv = require('dotenv');
var express = require('express');
var app = express();
dotenv.config()

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get('/api/', function (req, res) {
    const newDate = new Date().toUTCString();
    const unixDate = new Date().getTime();
    res.json({unix: unixDate, utc: newDate});
})

app.get('/api/:date', function (req, res) {
    const date = req.params.date
    const splited = date.split('-');
    if(splited.length > 1) {
        const unixDate = new Date(date).getTime();
        const newDate = new Date(date).toUTCString();
        if (newDate === "Invalid Date") {
            res.json({error: newDate});
        } else {
            res.json({unix: unixDate, utc: newDate});
        }
    }
    else if (splited.length === 1) {
        const intDate = parseInt(date);
        const newDate = new Date(intDate).toUTCString();
        if (newDate === "Invalid Date") {
            res.json({error: newDate});
        } else {
            res.json({unix: intDate, utc: newDate});
        }
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});