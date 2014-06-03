// [models/userInfo.js] UserInfo Schema

var mongoose = require('mongoose');

var UserInfoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    gender: {type: String, default: ''},
    ssn: {type: String, default: ''}
});

var UserInfo = mongoose.model('UserInfo', UserInfoSchema);
