var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');

// POST '/newuser'
exports.newuserinfo = function(req,res){

    var userInfo = req.user._json;
    var reportInfo = req.body;
    // Fill User Data
    var newUser = {
        id: userInfo.id,
        name: reportInfo.name,
        address: reportInfo.address,
        phone: reportInfo.phone,
        email: reportInfo.email,
        gender: reportInfo.gender,
        ssn: reportInfo.ssn
    };

    var newUserInfo = new UserInfo(newUser);
    newUserInfo.save(function(err, user){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '無法建立使用者', messages: [err]});
        }
        res.redirect("/report");
    });
};

// GET /userinfo
exports.userpage = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '修改資料', messages: ['尚未登入']});
    }
    UserInfo.find({id: req.user.id}, function(err, userInfos){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '修改資料', messages: [err]});
        }
        if (userInfos.length === 0){
            return res.render('userinfo', {user: req.user, title: '初次登入', userInfo: req.user._json});
        } 
        var userInfo = userInfos[0];
        console.log(userInfo);

        return res.render('changeuserinfo', {user: req.user, title: '修改資料', userInfo: userInfo});
    });
};

// POST '/userinfo'
exports.changeuserinfo = function(req,res){
    var userInfo = req.user._json;
    var reportInfo = req.body;

    var newUser = {
        id: userInfo.id,
        name: reportInfo.name,
        address: reportInfo.address,
        phone: reportInfo.phone,
        email: reportInfo.email,
        gender: reportInfo.gender,
        ssn: reportInfo.ssn
    };

    var newUserInfo = new UserInfo(newUser);

    UserInfo.find({id: req.user.id}, function(err, userInfos){
        console.log(userInfos);
        UserInfo.update({_id: userInfos[0]._id}, newUser, function(err, user){
            if (err){
                console.error(err);
                res.render('messages', {user: req.user, title: '修改資料', messages: [err]});
            }
            UserInfo.find({id: req.user.id}, function(err, userInfos, count){
                res.render('changeinfomessage', {user: req.user, title: '資料修改完成', messages: ["使用者資料已修改完成。"], userInfo: userInfos[0]});
            });
        });
    });
};
