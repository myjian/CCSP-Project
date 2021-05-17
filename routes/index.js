var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');

exports.index = function(req, res){
    res.render('index', {user: req.user, title: '安心上路'});
};

exports.tips = function(req, res){
    res.render('tips', {user: req.user, title: 'Q & A'});
};

exports.trafficLaws = function(req, res){
    res.render('trafficLaws', {user: req.user, title: '交通法規'});
};

exports.contactUs = function(req, res){
    res.render('contactUs', {user: req.user, title: '製作團隊'});
};

exports.report = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '檢舉交通違規', messages: ['尚未登入']});
    }
    UserInfo.find({id: req.user.id}, function(err, userInfos){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '檢舉交通違規', messages: [err]});
        }
        if (userInfos.length === 0){
            return res.render('userinfo', {user: req.user, title: '初次登入', userInfo: req.user._json});
        }
        return res.render('report', {user: req.user, title: '檢舉交通違規'});
    });
};

// TODO: imgur and YouTube Upload
exports.upload = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '上傳影片', messages: ['尚未登入']});
    }
    return res.render('upload', {user: req.user, title: '上傳影片'});
};
