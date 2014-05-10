var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db');

app.use(express.static('./public'));

app.use(bodyParser());

app.listen(5000, function(){
    console.log('Express server started at port 5000');
});

app.get('/items', db.list);

app.post('/items', db.add);
