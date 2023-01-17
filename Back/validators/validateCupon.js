const Cupon= require('../models/cupon');

// valida que el codigo de los cupones se ha unicos.
module.exports= async(req, res, next) =>{
    const codigo= req.body.codigo;
    const existCodigo= await Cupon.findOne({codigo: codigo});
    if(existCodigo){
        return res.status(422).json({error: 'Ya existe un cupon con ese codigo.'});
    }
    next();
};