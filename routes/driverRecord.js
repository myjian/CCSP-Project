const mongoose = require('mongoose');
const DriverRecord = mongoose.model('DriverRecord');
const UserInfo = mongoose.model('UserInfo');
const Busboy = require('busboy');

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
        if (err || !driverRecord){
            if (err) console.error(err);
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

        driverRecord.status = req.body.status;
        driverRecord.updated = Date.now();
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
    if (req.session.first) {
        res.render('successmessages', {user: req.user, title: '檢舉完成', recordid: req.params.id});
        delete req.session.first;
    } else if (req.session.allRecord) {
        res.redirect('/driverRecords/' + req.params.id);
    } else {
        res.redirect('/userRecords/' + req.params.id);
    }
};

// GET '/userRecords/:id/upload'
exports.fileUpload = function(req, res){
    if (!req.user){
        return res.render('notlogin', {user: req.user, title: '上傳檔案', messages: ['尚未登入']});
    }
    DriverRecord.findById(req.params.id, function(err, driverRecord) {
        if (err || !driverRecord){
            if (err) console.error(err);
            return res.render('messages', {user: req.user, title: '檢舉檔案', messages: [err, '（無此記錄？）']});
        }
        if (driverRecord.user_id !== req.user.id){
            return res.render('messages', {user: req.user, title: '上傳檔案', messages: ['權限不符，這是你的檢舉記錄嗎？']});
        }
        res.render('imgupload', {user: req.user, title: '上傳檔案', first: req.session.first});
    });
};

// POST '/userRecords/:id/upload'
exports.fileAccept = function(req, res) {
    if (!req.user) {
        return res.status(401).send('Please log in first!');
    }
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err || !driverRecord) {
            if (err) console.error(err);
            return res.status(404).send(err + '（無此記錄？）');
        }
        if (driverRecord.user_id !== req.user.id){
            return res.send('權限不符，這是你的檢舉記錄嗎？');
        }
        var filename = 'file-' + driverRecord._id;
        var gridfs = req.app.get('gridfs');
        var uploadFile = function() {
            var busboy = new Busboy({ headers: req.headers });
            busboy.on('file', function(fieldname, stream, originalFilename, encoding, mimetype) {
                //console.log(`DriverRecord ${req.params.id} File [${fieldname}]: originalFilename: ${originalFilename}, encoding: ${encoding}, mimetype: ${mimetype}`);
                var writeStream = gridfs.createWriteStream({
                    'content_type': mimetype,
                    'filename': filename
                });
                stream.pipe(writeStream);
                writeStream.on('close', (file) => {
                    //console.log(`File stored as ${file.filename}`);
                    var ext = mimetype.substring(0, mimetype.indexOf('/'));
                    driverRecord.ext = ext;
                    driverRecord.url = '/driverRecords/' + driverRecord._id + '/file';
                    driverRecord.save((err, theDriverRecord) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }
                        res.status(204).end();
                    });
                });
            });
            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {});
            busboy.on('finish', () => {});
            req.pipe(busboy);
        };
        // Remove old file
        gridfs.remove({'filename': filename}, function (err) {
            if (err) {
                console.error(err);
                res.status(500).send('Unable to remove old file.');
                return;
            }
            uploadFile();
        });
    });
};

// GET '/driverRecords/:id/file'
exports.getFile = function(req, res) {
    var filename = 'file-' + req.params.id;
    var gridfs = req.app.get('gridfs');
    gridfs.findOne({'filename': filename}, function (err, file) {
        if (err || !file) {
            if (err) console.error(err);
            res.status(404).send('File Not Found');
            return;
        }
        res.type(file.contentType);
        res.set('Content-Length', file.length);
        var readStream = gridfs.createReadStream({'filename': filename});
        readStream.pipe(res);
    });
};
