var mongoose = require('mongoose');
var Grid = require('gridfs-stream');

exports.init = function(app) {
    var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/test';

    // Prevent false-positive deprecation message
    // See https://github.com/Automattic/mongoose/issues/4291 for more details
    mongoose.Promise = global.Promise;

    mongoose.connect(mongoURI);

    var conn = mongoose.connection;
    // Error handler
    conn.on('error', function(err){
        console.error(err);
    });

    // Connection established
    conn.once('open', function(){
        var gridfs = Grid(conn.db, mongoose.mongo);
        app.set('gridfs', gridfs);
        console.info('MongoDB connection established at ' + mongoURI);
    });

    // Require schema
    require('./models/driverRecord');
    require('./models/userInfo');
};
