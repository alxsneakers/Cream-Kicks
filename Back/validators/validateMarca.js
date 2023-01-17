const Marca= require('../models/marca');

// valida que el nombre de la marca se ha unico.
module.exports= async(req, res, next)=>{
    const nombre= req.body.nombre;
    const existMarca= await Marca.findOne({nombre: nombre});
    if(existMarca){
        return res.status(422).json({message: 'Ya existe una marca con ese nombre.'});
    }
    next(); // vete a la siguiente ruta
};