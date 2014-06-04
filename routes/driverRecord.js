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
        return res.render('reportView', {user: req.user, title: '檢舉檔案', reportInfo: driverRecord});
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
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '上傳檔案', messages: ['尚未登入']});
    }
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '檢舉檔案', messages: [err, '（無此記錄？）']});
        }
        if (driverRecord.user_id !== req.user.id){
            return res.render('messages', {user: req.user, title: '上傳檔案', messages: ['權限不符，這是你的檢舉記錄嗎？']});
        }
        Img.find({id: driverRecord.id}, function(err, imgs){
            imgs.forEach(function(img, idx, array){
                img.remove(function(err, removedImg){
                    if (err) console.error(err);
                });
            });
        });
        res.render('imgupload', {user: req.user, title: '上傳檔案', first: req.session.first});
    });
};

// POST '/driverRecords/:id/imgupload'
exports.imgaccept = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '上傳檔案', messages: ['尚未登入']});
    }
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err){
            console.error(err);
            return res.render('messages', {user: req.user, title: '檢舉檔案', messages: [err, '（無此記錄？）']});
        }
        if (driverRecord.user_id !== req.user.id){
            return res.render('messages', {user: req.user, title: '上傳檔案', messages: ['權限不符，這是你的檢舉記錄嗎？']});
        }

        var imgInfo = req.body;
        if (imgInfo.part === "0") {
            Img.find({id: req.params.id}, function(err, imgs){ 
                if (err) console.error(err);
                imgs.forEach(function(img, idx, array){
                    img.remove(function(err, removedImg){
                        if (err) console.error(err);
                    });
                });
                res.end(req.params.id);
            });
        }
        else {
            console.log(imgInfo.part);
            var newImg = new Img({id: driverRecord._id, part: imgInfo.part, data: imgInfo.data});
            newImg.save(function(err, newImg){
                if (err) return res.send(err);
                if (newImg.part === 0){
                    console.log(newImg.data);
                    var type = newImg.data.slice(5,10);
                    type = (type === 'video' || type === 'image')? type: 'link';
                    DriverRecord.findById(newImg.id, function(err, theDriverRecord){
                        if (err) return res.send(err);
                        theDriverRecord.type = type;
                        theDriverRecord.url = '/driverRecords/' + theDriverRecord._id + '/file';
                        theDriverRecord.save(function(err, theDriverRecord){
                            if (err) return res.send(err);
                            console.log(theDriverRecord.type);
                            console.log(theDriverRecord.url);
                            res.send(theDriverRecord._id);
                        });
                    });
                }
                res.send(newImg.id);
            });
        }
    });
};

// GET '/driverRecords/:id/file'
exports.getFile = function(req, res){
    var referrer = req.get('Referrer');
    console.log('Referrer: ' + referrer);
    /*if (!fs.existsSync(fileName)){
        fs.writeFileSync(fileName, JSON.stringify({next_id: 1, items: []}));
    }*/
    Img.find({id: req.params.id}, function(err, parts){
        var file = '';
        console.log('parts.length: ' + parts.length);
        parts.sort(compareFunction);
        parts.forEach(function(part, idx, array){
            file += part.data;
        });
        console.log('file.length: ' + file.length);

        var extStart = file.indexOf('/') + 1;
        var extEnd = file.indexOf(';');
        var extension = file.substring(extStart, extEnd);
        console.log('extension: ' + extension);

        var fileStart = file.indexOf(',') + 1;
        var fileContent = file.slice(fileStart);
        var fileName = req.params.id + '.' + extension;
        console.log('fileName: ' + fileName);
        fs.writeFileSync(fileName, fileContent, 'base64', function(err){ console.log(err); });
        res.sendfile(fileName);
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
