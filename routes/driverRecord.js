var mongoose = require('mongoose');
var DriverRecord = mongoose.model('DriverRecord');
var UserInfo = mongoose.model('UserInfo');

// GET '/driverRecord'
exports.list = function(req, res){
    if (!req.user){
        res.render('message', {title: '安心上路', message: '尚未登入'});
        return;
    }
    DriverRecord.find({user_id: req.user._json.id}, function(err, userrRecords){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        res.render('userrecord', {title: '我的檢舉記錄', userRecords: userRecords});
    });
};

// POST '/driverRecord'
exports.create = function(req, res){
    if (!req.user){
        res.render('message', {title: '安心上路', message: '尚未登入'});
        return;
    }
    var reportInfo = req.body;

    // get Userinfo
    UserInfo.find({id: req.user._json.id}, function(err, userInfo, count){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        console.log(userInfo);

        // Fill User Data
        var newRecord = {
            user_id: userInfo.id,
        user_name: userInfo.name,
        user_email: userInfo.email,
        user_phone: userInfo.phone,
        user_address: userInfo.address
        };

        // Fill Driver Data
        newRecord.country = reportInfo.country;
        newRecord.location = reportInfo.location;
        newRecord.carNum = reportInfo.carNum;
        newRecord.happenedDate = reportInfo.date;
        newRecord.happenedTime = reportInfo.time;
        newRecord.condition = reportInfo.condition;
        if (reportInfo.url)
            newRecord.url = reportInfo.url;

        var driverRecord = new DriverRecord(newRecord);
        driverRecord.save(function(err, newDriverRecord){
            if (err){
                console.error(err);
                res.render('message', {title: '安心上路', message: err});
                return;
            }
            res.redirect('/driverRecord/' + newDriverRecord._id);
        });
    });
};

// GET '/driverRecord/:id'
exports.show = function(req, res){
    if (!req.user){
        res.render('message', {title: '檢舉檔案', message: '尚未登入'});
        return;
    }

    DriverRecord.find({_id: req.params.id, user_id: req.user._json.id}, function(err, driverRecord){
        if (err){
            console.error(err);
            res.render('message', {title: '檢舉檔案', message: err});
            return;
        }
        res.render('reportView', {title: '檢舉檔案', reportInfo: driverRecord});
    });
};

// POST '/driverRecord/:id'
exports.update = function(req, res){
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }

        if (req.body.plate){
            driverRecord.carNum = req.body.plate;
        }
        if (req.body.happened){
            driverRecord.happened = req.body.happened;
        }
        if (req.body.country){
            driverRecord.country = req.body.country;
        }
        if (req.body.road){
            driverRecord.road = req.body.road;
        }
        if (req.body.condition){
            driverRecord.condition = req.body.condition;
        }
        if (req.body.url){
            driverRecord.url = req.body.url;
        }
        driverRecord.updated = Date.now();
        driverRecord.save(function(err, updatedDriverRecord){
            if (err){
                console.error(err);
                res.render('message', {title: '安心上路', message: err});
                return;
            }
            res.json(updatedDriverRecord);
        });
    });
};


// POST '/driverRecord/newuser'
exports.newuserinfo = function(req,res){

    var userInfo = req.user._json;
    var reportInfo = req.body;

    // Fill User Data
    var newUser = {id: userInfo.id, email: userInfo.email, phone: reportInfo.phone, address: reportInfo.address};

    if(reportInfo.name)
    {
        newUser.name = reportInfo.name;
    }
    else
    {
        newUser.name = userInfo.name;
    }

    var newUserInfo = new UserInfo(newUser);
    newUserInfo.save(function(err, user){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        res.redirect("/report");
    });
};
