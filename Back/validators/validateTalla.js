const Talla= require('../models/talla');


// valida que el nombre de la marca se ha unico.
module.exports= async(req, res, next)=>{
    const talla= req.body.talla;
    const existTalla= await Talla.findOne({talla: talla});
    if(existTalla){
        return res.status(422).json({message: 'Ya existe una talla con ese numero.'});
    }
    next(); // vete a la siguiente ruta
};