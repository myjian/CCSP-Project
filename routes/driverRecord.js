var mongoose = require('mongoose');
var DriverRecord = mongoose.model('DriverRecord');
var UserInfo = mongoose.model('UserInfo');
var Img = mongoose.model('Img');
var fs = require("fs");
var multiparty = require('multiparty');
var util = require('util');

// GET '/userRecords'
exports.listUserRecords = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '我的檢舉記錄', messages: ['尚未登入']});
    }
    DriverRecord.find({user_id: req.user.id}, function(err, userRecords){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '我的檢舉記錄', messages: [err]});
        }
        req.session.userRecord = true;
        res.render('userRecords', {user: req.user, title: '我的檢舉記錄', driverRecords: userRecords});
    });
};

// GET '/driverRecords'
exports.list = function(req, res){
    DriverRecord.find({}, function(err, driverRecords){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '檢舉資料庫', messages: [err]});
        }
        delete req.session.userRecord;
        res.render('driverRecords', {user: req.user, title: '檢舉資料庫', driverRecords: driverRecords});
    });
};

// POST '/driverRecords'
exports.create = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '新檢舉案件', messages: ['尚未登入']});
    }
    var reportInfo = req.body;

    // get UserInfo
    UserInfo.find({id: req.user.id}, function(err, userInfo, count){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '新檢舉案件', messages: [err]});
        }
        if (count === 0){
            console.error(err);
            return res.render('messages', {user: req.user, title: '新檢舉案件', messages: ['請先填寫個人檔案']});
        }
        userInfo = userInfo[0];
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
        newRecord.description = reportInfo.description;
        if (reportInfo.url)
            newRecord.url = reportInfo.url;

        var newDriverRecord = new DriverRecord(newRecord);
        newDriverRecord.save(function(err, newDriverRecord){
            if (err){
                console.error(err);
                return res.render('messages', {user: req.user, title: '新檢舉案件', messages: [err]});
            }
            req.session.first = true;
            res.redirect('/driverRecords/' + newDriverRecord._id + '/imgupload');
        });
    });
};

// GET '/driverRecords/:id'
exports.show = function(req, res){
    req.session.recordid = req.params.id;
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '檢舉檔案', messages: [err, '（無此記錄？）']});
        }
        Img.find({id: driverRecord._id}, function(err, imgs){
            imgs.sort(compareFunction);
            var imgData = '';
            imgs.forEach(function(img, idx, array){
                imgData += img.data;
            });

            if (!req.user || driverRecord.user_id !== req.user.id){
                if (!imgData){
                    return res.render('publicReportView', {user: req.user, title: '檢舉檔案', reportInfo: driverRecord, image: '/img/logo.jpg'});
                }
                else if (imgData.slice(5,10) === "video"){
                    return res.render('publicReportViewVideo', {user: req.user, title: '檢舉檔案', reportInfo: driverRecord, image: imgData});
                }
                else {
                    return res.render('publicReportView', {user: req.user, title: '檢舉檔案', reportInfo: driverRecord, image: imgData});
                }
            }
            else {
                if (!imgData){
                    return res.render('reportView', {user: req.user, title: '檢舉檔案', reportInfo: driverRecord, image: '/img/logo.jpg'});
                }
                else if (imgData.slice(5,10) === "video"){
                    return res.render('reportViewVideo', {user: req.user, title: '檢舉檔案', reportInfo: driverRecord, image: imgData});
                }
                else {
                    return res.render('reportView', {user: req.user, title: '檢舉檔案', reportInfo: driverRecord, image: imgData});
                }
            }
        });
    });
};

// POST '/driverRecords/:id'
exports.update = function(req, res){
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '檢舉進度修改', messages: [err, '（無此記錄？）']});
        }
        if (driverRecord.user_id !== req.user.id){
            return res.render('messages', {user: req.user, title: '檢舉進度修改', messages: ['權限不符，這是你的檢舉記錄嗎？']});
        }
        console.log(driverRecord);

        driverRecord.status = req.body.status;
        driverRecord.updated = Date.now();
        console.log(driverRecord)
        driverRecord.save(function(err, updatedDriverRecord){
            if (err){
                console.error(err);
                return res.render('messages', {user: req.user, title: '檢舉進度修改', messages: [err]});
            }
            res.redirect('/driverRecords/' + updatedDriverRecord._id);
        });
    });    
};


// GET '/driverRecords/:id/success'
exports.success = function(req, res){
    if(req.session.first)
    {
        res.render('successmessages', {user: req.user, title: '檢舉完成', recordid: req.params.id});
        delete req.session.first;
    }
    else
    {
        if(req.session.userRecord)
        {
            res.redirect('/userRecords/'+req.params.id);
        }
        else
        {
            res.redirect('/driverRecords/'+req.params.id);    
        }
    }
};



// GET '/driverRecords/:id/imgupload'
exports.imgupload = function(req, res){
    Img.find({id: req.params.id},function(err, imgs){

        imgs.forEach(function(img, idx, array){
            img.remove(function(err, removedImg){
                if(err) console.error(err);
            });
        });
    });
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '上傳檔案', messages: ['尚未登入']});
    }
    res.render('imgupload', {user: req.user, title: '上傳檔案'});
};

// POST '/driverRecords/:id/imgupload'
exports.imgaccept = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '上傳檔案', messages: ['尚未登入']});
    }
    var imgInfo = req.body;
    console.log(imgInfo.part);
    var newImg = new Img({id: req.params.id, part: imgInfo.part, data: imgInfo.data});
    newImg.save(function(err, newImg){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '上傳檔案', messages: [err]});
        }
        DriverRecord.update({_id: newImg.id}, {imgpart: imgInfo.num_parts}, function(err, theDriverRecord){
            res.end(req.params.id)
            //res.redirect('/driverRecords/' + theDriverRecord._id);
        });
    });
};

function compareFunction(a, b){
    if (a.part < b.part){
        return -1;
    }
    if (a.part > b.part){
        return 1;
    }
    return 0;
}
