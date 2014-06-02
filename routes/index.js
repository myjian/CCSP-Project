var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');

exports.index = function(req, res){
    res.render('index', {title: '安心上路'});
};

exports.tips = function(req, res){
    res.render('tips', {title: 'Q & A'});
};

exports.trafficLaws = function(req, res){
    res.render('trafficLaws', {title: '交通法規'});
};

exports.imgupload = function(req, res){
    res.render('imgupload', {title: '上傳檔案'});
};

exports.contactUs = function(req, res){
    res.render('contactUs', {title: '聯絡我們'});
};

exports.report = function(req, res){
    if (!req.user){
        return res.render('notlogin', {title: '安心上路', messages: ['尚未登入']});
    }
    UserInfo.find({id: req.user.id}, function(err, userInfos, count){
        if (err){
            console.error(err);
            return res.render('messages', {title: '安心上路', messages: [err]});
        }
        if (count === 0){
            return res.render('userinfo', {title: '初次登入', userInfo: req.user._json});
        }
        return res.render('report', {title: '檢舉交通違規'});
    });
};

// TODO: imgur and YouTube Upload
exports.upload = function(req, res){
    if (!req.user){
        return res.render('notlogin', {title: '安心上路', messages: ['尚未登入']});
    }
    return res.render('upload', {title: '上傳影片'});
};
