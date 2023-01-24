var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var randomstring = require('randomstring');

var SESSION_SECRET = process.env.SESSION_SECRET || randomstring.generate(40);

var app = express();

// Init DB connection
require('./db').init(app);

var routes = require('./routes');
var userInfo = require('./routes/userInfo');
var driverRecord = require('./routes/driverRecord');
var facebook = require('./routes/facebook');

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: SESSION_SECRET}));

// development only
if (process.env.NODE_ENV === 'development') {
    console.log('using errorHandler and logger');
    app.use(errorHandler());
    app.use(logger('dev'));
}

app.listen(app.get('port'), function(){
    console.log('Express server started at port ' + app.get('port'));
});

// Main operations
app.get('/', routes.index);
app.get('/tips', routes.tips);
app.get('/report', routes.report);
app.get('/trafficLaws', routes.trafficLaws);
app.get('/contactUs', routes.contactUs);

// TODO: upload functionality
app.get('/upload', routes.upload);

// Database operations - UserInfo
app.post('/newuser', userInfo.newuserinfo);
app.get('/userinfo', userInfo.userpage);
app.post('/userinfo', userInfo.changeuserinfo);

// Database operations - DriverRecord
app.get('/driverRecords', driverRecord.list);
app.get('/driverRecords/:id', driverRecord.show);
app.get('/driverRecords/:id/file', driverRecord.getFile);
app.get('/userRecords/:id/file', driverRecord.getFile);
app.get('/userRecords', driverRecord.listUserRecords);
app.post('/userRecords', driverRecord.create);
app.get('/userRecords/:id', driverRecord.show);
app.post('/userRecords/:id', driverRecord.update);
app.get('/userRecords/:id/success', driverRecord.success);

// Database operations - Upload
app.get('/userRecords/:id/upload', driverRecord.fileUpload);
app.post('/userRecords/:id/upload', driverRecord.fileAccept);

app.get('/getfbinfo', facebook.show);
app.get('/logout', facebook.logout);

