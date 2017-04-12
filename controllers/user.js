var models = require('../models');

exports.index = (req, res)=>{
    models.User.findAll().then((users)=>{
        res.render('user/index', {users:users});
    });
};

exports.postUser = (req,res)=>{
    models.User.create({
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name
    }).then(()=>{
       res.redirect('/users'); 
    });
};