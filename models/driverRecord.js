// [models/driverRecord.js] DriverRecord Schema 

var mongoose = require('mongoose');

var DriverRecordSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    user_name: {type: String, required: true},
    user_phone: {type: String, required: true},
    user_email: {type: String, required: true},
    user_address: {type: String},
    user_ssn: {type: String},

    country: {type: String, required: true},
    location: {type: String, required: true},
    carNum: {type: String, required: true},
    happenedDate: {type: String, required: true},
    happenedTime: {type: String, required: true},
    description: {type: String, required: true},
    ext: {type: String, default: 'image'}, // image, video, or link (external link)
    url: {type: String, default: ''},

    created: {type: Date, default: Date.now},
    updated: Date,
    status: {type: String, default: 'sent'}
});

var DriverRecord = mongoose.model('DriverRecord', DriverRecordSchema);
