var passport = require('passport');

// YouTube Upload Widget
exports.upload = function(req, res){
    res.render('upload', {title: '上傳影片'});
    return passport.authenticate('facebook', { scope: ['user_about_me', 'email'] });
};

exports.tips = function(req, res){
    res.render('tips', {title: '檢舉撇步、Q & A'});
};

exports.report = function(req, res){
    res.render('report', {title: '檢舉交通違規'});
};
