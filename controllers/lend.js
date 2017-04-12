var models = require('../models');

exports.index = (req, res)=>{
    models.Lend.findAll({
        attributes:['id', 'returnTime', 'active']
    }).then((lends)=>{
        models.Inventory.findAll().then((inventory)=>{
            res.render('lend/index', {lends:lends, inventory:inventory});
        })
    });
};

exports.postLend = (req,res)=>{
    models.Lend.create({
        lenderId: req.body.lender_id,
        receiverId: req.body.receiver_id,
        borrowerId: req.body.borrower_id,
        inventoryId: req.body.inventory_id,
        returnTime: req.body.return_time,
        active: req.body.active
    }).then(()=>{
       res.redirect('/lends'); 
    });
};