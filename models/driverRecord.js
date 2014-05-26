// DriverSchema in models/driverRecord.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverRecordSchema = new Schema({
    userId: {type: Number, required: true},
    phone: {type: String},
    email: {type: String, required: true},
    country: {type: String, required: true},
    address: {type: String, required: true},
    carNum: {type: String, required: true},
    happened: {type: Date, required: true},
    condition: {type: String, required: true},
    url: String,
    created: {type: Date, default: Date.now},
    updated: Date
});

var DriverRecord = mongoose.model('DriverRecord', DriverRecordSchema);
