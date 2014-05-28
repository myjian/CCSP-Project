var mongoose = require('mongoose');
var DriverRecord = mongoose.model('DriverRecord');

// GET '/driverRecord'
exports.list = function(req, res){
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
        res.json({driverRecords: driverRecords});
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
    var newRecord = {userId: userInfo.id, email: userInfo.email};
    if (userInfo.phone){
        newRecord.phone = userInfo.phone;
    }
    newRecord.country = reportInfo.country;
    newRecord.address = reportInfo.location;
    newRecord.carNum = reportInfo.carNum;
    newRecord.happened = new Date(reportInfo.year, reportInfo.month, reportInfo.day,
            reportInfo.hour, reportInfo.minute);
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
        res.json(newDriverRecord);
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
