// DriverSchema in models/driverRecord.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    gender: {type: String},
    idCardNumber: {type: String}
});

var UserInfo = mongoose.model('UserInfo', UserInfoSchema);
