var sqlite3 = require('sqlite3').verbose();
var dbfile = './baddriver.sqlite';
var db = new sqlite3.Database(dbfile);

exports.list = function(req, res){
    db.all('SELECT * FROM Record', function(err, rows) {
        res.json(rows);
    });
};

exports.add = function(req, res){
    var newRecord = req.body;
    console.log(newRecord);
    var plate = newRecord.plate;
    var country = newRecord.country;
    var road = newRecord.road;
    var condition = newRecord.condition;
    var url = newRecord.url;
    console.log(plate, country, road, condition, url);

    if (plate !== undefined && country !== undefined && road !== undefined && condition !== undefined && url !== undefined){
        db.run('INSERT INTO Record (plate, country, road, condition, url) VALUES (?, ?, ?, ?, ?)',
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
