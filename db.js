var mongoose = require('mongoose');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/test';
mongoose.connect(mongoURI);

// Error handler
mongoose.connection.on('error', function(err){
    console.log(err);
});

// Connection established
mongoose.connection.once('open', function(){
    console.log('database connection established at ' + mongoURI);
});

// Require schema
require('./models/driverRecord');
require('./models/userInfo');
require('./models/imgsave');
