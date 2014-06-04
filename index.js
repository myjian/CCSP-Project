require('./db');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var favicon = require('serve-favicon');

var routes = require('./routes');
var userInfo = require('./routes/userInfo');
var driverRecord = require('./routes/driverRecord');
var facebook = require('./routes/facebook');

var passport = require('passport');
var util = require('util');
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "273057782873545";
var FACEBOOK_APP_SECRET = "3d8a24ec3de700c9a0c5f20b21158ca0";

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
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
app.get('/userRecords', driverRecord.listUserRecords);
app.get('/driverRecords', driverRecord.list);
app.post('/driverRecords', driverRecord.create);
app.get('/driverRecords/:id', driverRecord.show);
app.get('/driverRecordsimg/:id', driverRecord.imgshow);
app.post('/driverRecords/:id', driverRecord.update);
app.get("/driverRecordsimg/js/imgupload.js", routes.imguploadjs);

// Database operations - Img
app.get('/driverRecords/:id/imgupload', driverRecord.imgupload);
app.post('/driverRecords/:id/imgupload', driverRecord.imgaccept);

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

