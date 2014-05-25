var fs = require("fs");
var dbfile = './baddriver.sqlite';
var exists = fs.existsSync(dbfile);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbfile);

db.serialize(function(){
    if(!exists){
        db.run("CREATE TABLE DriverRecord (userId INTEGER, plate TEXT, country TEXT, road TEXT, condition TEXT, url TEXT, timestamp INTEGER)");
    }
});
exports.list = function(req, res){
    var plate = req.param("plate");
    var country = req.param("country");
    var road = req.param("road");
    var condition = req.param("condition");
    db.all('SELECT * FROM DriverRecord', function(err, rows) {
        res.json(rows);
    });
};

exports.add = function(req, res){
    var newRecord = req.body;
    var userId = newRecord.userId;
    var plate = newRecord.plate;
    var country = newRecord.country;
    var road = newRecord.road;
    var condition = newRecord.condition;
    var url = newRecord.url;
    var timestamp = Date.now();
    console.log(plate, country, road, condition, url);

    if (userId != undefined && plate !== undefined && country !== undefined && road !== undefined && condition !== undefined && url !== undefined){
        db.run('INSERT INTO DriverRecord (userId, plate, country, road, condition, url, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [userId, plate, country, road, condition, url, timestamp]);
    }
    else {
        console.log(userId, plate, country, road, condition, url, timestamp);
    }
    res.json([userId, plate, country, road, condition, url, timestamp]);
};

/*
db.serialize(function(){
    db.each('SELECT Singer.Name FROM Singer', function(err, row) {
        console.log(row);
    });
});
*/
// db.close();
