exports.handler = (req, res)=>{
    res.render('home', {name: 'world'});
    console.log(req.session);
};
