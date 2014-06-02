var mongoose = require('mongoose');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://heroku_app25078252:o8itrmptdpv3okr2ft2d3vf22s@ds049858.mongolab.com:49858/heroku_app25078252';
mongoose.connect(mongoURI);

// Error handler
mongoose.connection.on('error', function(err){
    console.log(err);
});

// Connection established
mongoose.connection.once('open', function(){
    console.log('database connection established');
});

// Require schema
require('./models/driverRecord');
require('./models/userInfo');
require('./models/imgsave');
