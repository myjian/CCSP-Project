var fs = require("fs");
var dbfile = './baddriver.sqlite';
var exists = fs.existsSync(dbfile);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbfile);

db.serialize(function(){
    if(!exists){
        db.run("CREATE TABLE DriverRecord (userId INTEGER, plate TEXT, country TEXT, road TEXT, condition TEXT, url TEXT)");
    }
});
exports.list = function(req, res){
    var newRecord = req.body;
    console.log(newRecord);
    var plate = newRecord.param("plate");
    var country = newRecord.param("country");
    var road = newRecord.param("road");
    var condition = newRecord.param("condition");
    db.all('SELECT * FROM DriverRecord', function(err, rows) {
        res.json(rows);
    });
};

exports.add = function(req, res){
    var newRecord = req.body;
    var timestamp = new Date().value();
    var userId = newRecord.userId;
    var plate = newRecord.plate;
    var country = newRecord.country;
    var road = newRecord.road;
    var condition = newRecord.condition;
    var url = newRecord.url;
    console.log(plate, country, road, condition, url);

    if (userId != undefined && plate !== undefined && country !== undefined && road !== undefined && condition !== undefined && url !== undefined){
        db.run('INSERT INTO DriverRecord (userId, plate, country, road, condition, url) VALUES (?, ?, ?, ?, ?, ?)',
                [plate, country, road, condition, url]);
    }
    else {
        console.log(plate, country, road, condition, url);
    }
    res.json(newRecord);
};

/*
db.serialize(function(){
    db.each('SELECT Singer.Name FROM Singer', function(err, row) {
        console.log(row);
    });
});
*/
// db.close();
