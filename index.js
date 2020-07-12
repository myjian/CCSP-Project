var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var randomstring = require('randomstring');

var passport = require('passport');
var util = require('util');
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "273057782873545";
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
if (!FACEBOOK_APP_SECRET) {
  console.error("Fatal: FACEBOOK_APP_SECRET env not found");
  process.exit(1);
}
var SESSION_SECRET = process.env.SESSION_SECRET || randomstring.generate(40);

var app = express();

// Init DB connection
require('./db').init(app);

var routes = require('./routes');
var userInfo = require('./routes/userInfo');
var driverRecord = require('./routes/driverRecord');
var facebook = require('./routes/facebook');

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

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

// Passport-Facebook
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));

app.get('/auth/facebook', facebook.login);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    facebook.succeed);

app.get('/getfbinfo', facebook.show);
app.get('/logout', facebook.logout);

