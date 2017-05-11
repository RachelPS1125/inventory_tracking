exports.handler = (req, res)=>{
    req.flash('info', 'Here is some info');
    res.render('home', {name: 'world'});
};

