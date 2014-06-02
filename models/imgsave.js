// DriverSchema in models/driverRecord.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImgSchema = new Schema({
    id: {type: String, required: true},
    part: {type: Number, required: true},
    data: {type: String, required: true},
    number: {type: Number}
});

var Img = mongoose.model('Img', ImgSchema);
