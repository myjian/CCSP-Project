var express = require('express');
var app = express();

app.use(express.static('./public'));

//app.use(express.bodyParser());

app.listen(5000, function(){ console.log('Express server started at port 5000'); });

