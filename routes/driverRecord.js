var mongoose = require('mongoose');
var DriverRecord = mongoose.model('DriverRecord');

// GET '/driverRecord'
exports.list = function(req, res){
    userRecords = [];
    if (!req.user){
        res.render('message', {title: '安心上路', message: 'not logged in'});
        return;
    }
    DriverRecord.find(function(err, driverRecords, count){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        for (var i=0; i<driverRecords.length; i++)
        {
            if (driverRecords[i].user_id === req.user._json.id)
            {
                userRecords.push(driverRecords[i]);
            }
        }
        res.render('userrecord', {title: '檢舉交通違規', userRecords: userRecords});


    });
};

// POST '/driverRecord'
exports.create = function(req, res){
    if (!req.user){
        res.render('message', {title: '安心上路', message: 'not logged in'});
        return;
    }
    var userInfo = req.user._json;
    var reportInfo = req.body;

    // Fill User Data
    var newRecord = {user_id: userInfo.id, user_name: userInfo.name, user_email: userInfo.email};
    if (userInfo.phone)
        newRecord.user_phone = userInfo.phone;
    if (userInfo.address)
        newRecord.user_address = userInfo.address;

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
        res.render('reportView', {title: '檢舉檔案', userInfo: req.user._json, reportInfo: newDriverRecord});
    });
};

// GET '/driverRecord/:id'
exports.show = function(req, res){
    DriverRecord.findById(req.params.id, function(err, driverRecord){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        res.json(driverRecord);
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
