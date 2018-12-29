var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.use(express.static("./"));
// app.use('/static', express.static(path.join(__dirname, 'images')));
// app.use('/static', express.static(path.join(__dirname, 'icons')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);