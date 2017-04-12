var models = require('../models');

exports.index = (req, res)=>{
    res.render('borrower/index');
};

exports.api = {
    get: (req, res)=>{
        models.Borrower.findAll().then((borrowers)=>{
            res.json(borrowers);
        }).catch(err=>res.json(err));
    },
    delete: (req, res)=>{
        var id = req.params.id;
        models.Borrower.destroy({
            where: {
                idNumber: id
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
       models.Borrower.create({
        idNumber: req.body.idNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        classYear: req.body.classYear,
        email: req.body.email,
        cellNumber: req.body.cellNumber
        }).then((element)=>{
            res.json(element);
        }).catch((err)=>{
            res.status(500).json({error:err});
        }); 
    },
    update:(req,res)=>{
        var id = req.params.id;
        var payload = {
            idNumber: req.body.idNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            classYear: req.body.classYear,
            email: req.body.email,
            cellNumber: req.body.cellNumber
        };
        models.Borrower.update(payload,{
            where:{
                idNumber:id
            },
            returning: true,
            plain: true
        }).then((result)=>{
           res.json(result[1]);
        }).catch((err)=>{
            res.status(500).json({error:err});
        });
    }
};