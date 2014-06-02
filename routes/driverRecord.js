var mongoose = require('mongoose');
var DriverRecord = mongoose.model('DriverRecord');
var UserInfo = mongoose.model('UserInfo');
var Img = mongoose.model('Img');
var fs = require("fs");

// GET '/driverRecord'
exports.list = function(req, res){
    if (!req.user){
        res.render('notloginmessage', {title: '安心上路', message: '尚未登入'});
        return;
    }
    DriverRecord.find({user_id: req.user._json.id}, function(err, userRecords){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        res.render('userrecord', {title: '我的檢舉記錄', userRecords: userRecords});
    });
};

// POST '/driverRecord'
exports.create = function(req, res){
    if (!req.user){
        res.render('notloginmessage', {title: '安心上路', message: '尚未登入'});
        return;
    }
    var reportInfo = req.body;

    // get Userinfo
    UserInfo.find({id: req.user._json.id}, function(err, userInfo, count){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        if (count === 0){
            console.error(err);
            res.render('message', {title: '安心上路', message: '請先填寫個人檔案'});
            return;
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
            res.redirect("/imgupload");
            req.session.recordid = newDriverRecord._id;
            //res.redirect('/driverRecord/' + newDriverRecord._id);
        });
    });
};

// GET '/driverRecord/:id'
exports.show = function(req, res){
    if (!req.user){
        res.render('notloginmessage', {title: '檢舉檔案', message: '尚未登入'});
        return;
    }

    DriverRecord.find({_id: req.params.id, user_id: req.user._json.id}, function(err, driverRecord, count){
        if (err){
            console.error(err);
            res.render('message', {title: '檢舉檔案', message: err});
            return;
        }
        if (count === 0){
            res.render('message', {title: '檢舉檔案', message: '無此記錄'});
            return;
        }
        id = driverRecord[0].imgid;
        parts = driverRecord[0].imgpart;

        var imgdata = "";
        Img.find({id: id},function(err, imgs){
            
            for(var i = 0; i <= parts; i++)
            {
                for(var j = 0; j < parts; j++)
                {
                    if(imgs[j].part === i)
                    {
                        imgdata = imgdata + imgs[j].data;
                    }
                }
                if(i === parts)
                {
                    console.log(imgdata.length);
                    console.log(driverRecord[0]);
                    res.render('reportView', {title: '檢舉檔案', reportInfo: driverRecord[0], image: imgdata});
                    //res.render('imgshow', {img: imgdata, title:'顯示上傳圖檔'});         
                }
            }
        });
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


// POST '/driverRecord/newuser'
exports.newuserinfo = function(req,res){

    var userInfo = req.user._json;
    var reportInfo = req.body;
    // Fill User Data
    var newUser = {
        id: userInfo.id,
        name: reportInfo.name,
        address: reportInfo.address,
        phone: reportInfo.phone,
        email: reportInfo.email,
        gender: reportInfo.gender,
        idCardNumber: reportInfo.idcardnumber
    };

    var newUserInfo = new UserInfo(newUser);
    newUserInfo.save(function(err, user){
        if (err){
            console.error(err);
            res.render('message', {title: '安心上路', message: err});
            return;
        }
        res.redirect("/report");
    });
};



// POST '/driverRecord/changeuserinfo'
exports.changeuserinfo = function(req,res){
    var userInfo = req.user._json;
    var reportInfo = req.body;

    var newUser = {
        id: userInfo.id,
        name: reportInfo.name,
        address: reportInfo.address,
        phone: reportInfo.phone,
        email: reportInfo.email,
        gender: reportInfo.gender,
        idCardNumber: reportInfo.idcardnumber
    };

    var newUserInfo = new UserInfo(newUser);

    UserInfo.find({id: req.user._json.id}, function(err, userInfos){
        console.log(userInfos);
        UserInfo.update({_id: userInfos[0]._id}, newUser, function(err, user){
            if (err){
                console.error(err);
                res.render('message', {title: '安心上路', message: err});
            }
            UserInfo.find({id: req.user._json.id}, function(err, userInfos, count){
                res.render('changeinfomessage', {title: '資料修改完成', message: "使用者資料已修改完成。", userInfo: userInfos[0]});
            });
        });
    });    
};

exports.imgaccept = function(req, res){
    var imgInfo = req.body;
    nowpart = parseInt(req.params.part);
    req.session.imgid = imgInfo.id;
    req.session.imgparts = parseInt(imgInfo.max)+1;

    var newImg = new Img({id: imgInfo.id, part: nowpart, data: imgInfo.data});
    newImg.save(function(err, nowimg){
        if (err){
            console.error(err);
            return;
        }
        console.log(nowimg.number);

        res.redirect("/imgupload");

    });
  
};

exports.imgsend = function(req, res){

    DriverRecord.update({_id: req.session.recordid}, {imgid: req.session.imgid, imgpart: req.session.imgparts},function(err,newDriverRecord){
        
        res.redirect('/driverRecord/' + req.session.recordid);
        delete req.session.imgparts, req.session.recordid, req.session.imgparts;
        console.log(newDriverRecord); 
    });

};

function imgshow(id, parts){
    var imgdata = "";
    console.log(parts);
    console.log(id);

    Img.find({id: id},function(err, imgs){
        
        for(var i = 0; i <= parts; i++)
        {
            for(var j = 0; j < parts; j++)
            {
                if(imgs[j].part === i)
                {
                    imgdata = imgdata + imgs[j].data;
                }
            }
            if(i === parts)
            {
                console.log(imgdata.length);
                return imgdata;
                //res.render('imgshow', {img: imgdata, title:'顯示上傳圖檔'});         
            }
        }
    });

}