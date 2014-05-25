require('./db');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');

//var routes = require('./routes');
var driverRecord = require('./routes/driverRecord');

var passport = require('passport')
var util = require('util')
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "273057782873545"
var FACEBOOK_APP_SECRET = "3d8a24ec3de700c9a0c5f20b21158ca0";

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

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




passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
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


app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect('/');
  });



app.get('/logout', function(req, res){
  req.logout();
  console.log("123");
});

app.get('/getfbinfo', function(req, res){
  if(req.user)
  {
  	//console.log(req.user._json);
  	data = JSON.stringify(req.user._json)
  	res.end(data);
  }
  else
  {
  	res.end("123");
  };
  
});

