var passport = require('passport');

exports.login = function(req, res){
    req.session.redirectPath = req.query.redirectPath;
    return res.redirect('/auth/facebook/callback');
};

exports.succeed = function(req, res){
    res.redirect(req.session.redirectPath);
};

exports.show = function(req, res){
    if (req.user){
        res.json({login: true, user: req.user._json});
        return;
    }
    res.json({login: false});
};

exports.logout = function(req, res){
    req.logout();
    console.log('/logout');
    console.log(req.query.redirectPath);
    if (req.query.redirectPath){
        res.redirect(req.query.redirectPath);
        return;
    }
    res.redirect("/");
}
