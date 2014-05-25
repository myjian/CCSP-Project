require('./db');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');

//var routes = require('./routes');
var driverRecord = require('./routes/driverRecord');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen(app.get('port'), function(){
    console.log('Express server started at port ' + app.get('port'));
});

app.get('/driverRecord', driverRecord.list);

app.post('/driverRecord', driverRecord.create);

app.get('/driverRecord/:id', driverRecord.show);

app.post('/driverRecord/:id', driverRecord.update);

