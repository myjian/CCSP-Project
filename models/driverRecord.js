// DriverSchema in models/driverRecord.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverRecordSchema = new Schema({
    user_id: {type: String, required: true},
    user_phone: {type: String},
    user_email: {type: String, required: true},
    user_address: {type: String},
    user_name: {type: String},

    country: {type: String, required: true},
    location: {type: String, required: true},
    carNum: {type: String, required: true},
    happenedDate: {type: String, required: true},
    happenedTime: {type: String, required: true},
    condition: {type: String, required: true},
    url: String,

    created: {type: Date, default: Date.now},
    updated: Date
});

var DriverRecord = mongoose.model('DriverRecord', DriverRecordSchema);
