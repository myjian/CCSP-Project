var passport = require('passport');

exports.login = function(req, res, next){
    req.session.redirectPath = req.get('Referrer');
    passport.authenticate('facebook', { failureRedirect: '/' })(req, res, next);
};

exports.succeed = function(req, res){
    res.redirect(req.session.redirectPath);
};

exports.show = function(req, res){
    if (req.user){
        return res.json({login: true, user: req.user._json});
    }
    res.json({login: false});
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('back');
}
