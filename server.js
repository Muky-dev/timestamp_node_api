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
    res.json({unix: Date.now(), utc: Date()});
})

app.get('/api/:date_string', function (req, res) {
    const date = req.params.date_string;
    const splited = date.split('-');
    const blankSplited = date.split(' ');
    console.log(splited, blankSplited);
    if(splited.length > 1 || blankSplited.length > 1) {
        const dateObject = new Date(date);
        if (dateObject.toUTCString() === "Invalid Date") {
            res.json({error: "Invalid Date"});
        } else {
            res.json({unix: dateObject.valueOf(), utc: dateObject.toUTCString()});
        }
    }
    else if (splited.length === 1) {
        if(/[A-Za-z]/.test(date)) {
            res.json({error: "Invalid Date"});
            console.log(date)
        } else {
            const intDate = parseInt(date);
            res.json({unix: intDate, utc: new Date(intDate).toUTCString()});
        }
    } else {
        res.json({error: "Invalid Date"});
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});