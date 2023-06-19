var mongoose = require('mongoose');

exports.init = function(app) {
  var mongoURI =
    process.env.MONGOLAB_URI || 'mongodb://localhost:27017/baddriver';

  // Prevent false-positive deprecation message
  // See https://github.com/Automattic/mongoose/issues/4291 for more details
  mongoose.Promise = global.Promise;

  mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

  var conn = mongoose.connection;
  // Error handler
  conn.on('error', function(err){
    console.error(err);
  });

  // Connection established
  conn.once('open', function(){
    const gridfs = new mongoose.mongo.GridFSBucket(conn.db);
    app.set('gridfs', gridfs);
    console.info('MongoDB connection established at ' + mongoURI);
  });

  // Require schema
  require('./models/driverRecord');
  require('./models/userInfo');
};
