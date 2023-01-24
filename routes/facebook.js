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
