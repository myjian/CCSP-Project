// DriverSchema in models/driverRecord.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverRecordSchema = new Schema({
    userId: {type: Number, required: true},
    happened: {type: Date, required: true},
    plate: {type: String, required: true},
    country: {type: String, required: true},
    road: {type: String, required: true},
    condition: {type: String, required: true},
    url: String,
    created: {type: Date, default: Date.now},
    updated: Date
});

var DriverRecord = mongoose.model('DriverRecord', DriverRecordSchema);
