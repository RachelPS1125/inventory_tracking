var models = require('../models');

exports.index = (req, res)=>{
    res.render('inventory/index');
};

exports.api = {
    get: (req, res)=>{
        models.Inventory.findAll().then((inventories)=>{
            res.json(inventories)
        }).catch(err=>res.json(err));
    },
    delete: (req, res)=>{
        var id = req.params.id;
        models.Inventory.destroy({
            where: {
                id: id
            }
        }).then(()=>{
            res.json({});            
        }).catch((err)=>{
            res.json({
                error: err
            });
        });
    },
    create:(req,res)=>{
       models.Inventory.create({
        name: req.body.name,
        quantity: req.body.quantity,
        imageLink: req.file.location,
        }).then((element)=>{
            res.json(element);
        }).catch((err)=>{
            res.json({error:err});
        }); 
    },
    update:(req,res)=>{
        var id = req.params.id;
        var payload = {
            name: req.body.name,
            quantity: req.body.quantity
        };
        if (req.file && req.file.location){
            payload.imageLink = req.file.location;
        }
        console.log(payload);
        models.Inventory.update(payload,{
            where:{
                id:id
            },
            returning: true,
            plain: true
        }).then((result)=>{
           console.log(result);
           res.json(result[1]);
        }).catch((err)=>{
            res.json({error:err});
        });
    }
};