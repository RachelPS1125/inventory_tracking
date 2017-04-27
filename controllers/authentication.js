exports.isAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

exports.handler = (req,res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {
    req.checkBody('username', 'please enter a username').notEmpty();
    req.checkBody('password', 'please enter a password').notEmpty();
    var errors = req.validationErrors(true);
    res.render('login', {errors: errors});
};

exports.logout = (req, res)=>{
   req.logout();
   res.redirect('/login');
};


