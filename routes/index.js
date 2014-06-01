var passport = require('passport');
var driverRecord = require('./driverRecord');
var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');

// YouTube Upload Widget
exports.upload = function(req, res){
    res.render('upload', {title: '上傳影片'});
    return passport.authenticate('facebook', { scope: ['user_about_me', 'email'] });
};

exports.tips = function(req, res){
    res.render('tips', {title: '檢舉撇步、Q & A'});
};

exports.report = function(req, res){

	if(!req.user)
	{
		res.render('message', {title: '安心上路', message: 'not logged in'});
	}
	else
	{	
		UserInfo.find(function(err, userInfos, count){
	        if (err){
	            console.error(err);
	            res.render('message', {title: '安心上路', message: err});
	            return;
	        }
	        for (var i=0; i<userInfos.length; i++)
	        {
	            if (userInfos[i].id === req.user._json.id)
	            {
	            	res.render('report', {title: '檢舉交通違規'});
	            	console.log(userInfos[i]);
	                return;
	            }
	        } 
	        res.render('userinfo', {title: '初次登入'});
	    });
	}
};
