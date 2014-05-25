var mongoose = require('mongoose');
var DriverRecord = mongoose.model('DriverRecord');

// GET '/driverRecord'
exports.list = function(req, res){
    DriverRecord.find(function(err, driverRecords, count){
        if (err){
            console.error(err);
            res.json({error: err.name}, 500);
            return;
        }
        res.json({driverRecords: driverRecords});
    });
};

// POST '/driverRecord'
exports.create = function(req, res){
    var driverRecord = new DriverRecord(req.body);
    driverRecord.save(function(err, newDriverRecord){
        if (err){
            console.error(err);
            res.json({error: err.name}, 500);
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
            res.json({error: err.name}, 500);
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
            res.json({error: err.name}, 500);
            return;
        }

        if (req.body.plate){
            driverRecord.plate = req.body.plate;
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
                res.json({error: err.name}, 500);
                return;
            }
            res.json(updatedDriverRecord);
        });
    });
};
