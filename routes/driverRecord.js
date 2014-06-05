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
        delete req.session.allRecord;
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
        req.session.allRecord = true;
        res.render('driverRecords', {user: req.user, title: '檢舉資料庫', driverRecords: driverRecords});
    });
};

// POST '/userRecords'
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
            res.redirect('/userRecords/' + newDriverRecord._id + '/upload');
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

// POST '/userRecords/:id'
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
            res.redirect('/userRecords/' + updatedDriverRecord._id);
        });
    });
};

// GET '/userRecords/:id/success'
exports.success = function(req, res){
    if(req.session.first)
    {
        res.render('successmessages', {user: req.user, title: '檢舉完成', recordid: req.params.id});
        delete req.session.first;
    }
    else
    {
        if(req.session.allRecord)
        {
            res.redirect('/driverRecords/'+req.params.id);
        }
        else
        {
            res.redirect('/userRecords/'+req.params.id);
        }
    }
};

// GET '/userRecords/:id/upload'
exports.fileUpload = function(req, res){
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
        res.render('imgupload', {user: req.user, title: '上傳檔案', first: req.session.first});
    });
};

// POST '/userRecords/:id/upload'
exports.fileAccept = function(req, res){
    if (!req.user){
        return res.send('尚未登入');
    }
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err){
            console.error(err);
            return res.send(err + '（無此記錄？）');
        }
        if (driverRecord.user_id !== req.user.id){
            return res.send('權限不符，這是你的檢舉記錄嗎？');
        }

        var partInfo = req.body;
        if (partInfo.part === '-1') {
            console.log('delete old file');
            Img.find({id: req.params.id}, function(err, parts){
                if (err) console.error(err);
                parts.forEach(function(part, idx, array){
                    part.remove(function(err, removedPart){
                        if (err) console.error(err);
                    });
                });
                return res.send('delete old file');
            });
        }
        else {
            var newPart = new Img({id: driverRecord._id, part: partInfo.part, data: partInfo.data});
            newPart.save(function(err, newPart){
                if (err) return res.send(err);
                console.log(newPart.part);
                if (newPart.part === 0){
                    var ext = newPart.data.slice(5,10);
                    ext = (ext === 'video' || ext === 'image')? ext: 'link';
                    console.log('ext: ' + ext);
                    DriverRecord.findById(newPart.id, function(err, theDriverRecord){
                        if (err) return res.send(err);
                        theDriverRecord.ext = ext;
                        theDriverRecord.url = '/driverRecords/' + theDriverRecord._id + '/file';
                        theDriverRecord.save(function(err, theDriverRecord){
                            if (err) return res.send(err);
                            console.log(theDriverRecord.ext);
                            console.log(theDriverRecord.url);
                            return res.send('/userRecords/' + theDriverRecord._id + '/success');
                        });
                    });
                }
                return res.send('/userRecords/' + newPart.id + '/success');
            });
        }
    });
};

// GET '/driverRecords/:id/file'
exports.getFile = function(req, res){
    Img.find({id: req.params.id}, function(err, parts){
        if (parts.length === 0) return '';
        var file = '';
        console.log('parts.length: ' + parts.length);
        parts.sort(compareFunction);
        parts.forEach(function(part, idx, array){
            file += part.data;
        });
        console.log('file.length: ' + file.length);

        var extStart = file.indexOf('/') + 1;
        var extEnd = file.indexOf(';');
        console.log(extStart, extEnd);
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
