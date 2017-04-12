var models = require('../models');

exports.isAuthenticated = (req, res, next)=>{
    //var email = req.user.emails[0].value;
    //console.log(email);
    //models.User.find({email: email})
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
    console.log(errors);
    res.render('login', {errors: errors});
};

exports.logout = (req, res)=>{
   req.logout();
   res.redirect('/login');
};


