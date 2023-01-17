const Admin= require('../models/admin');



// valida que no haya dos cuentas con el mismo nombre
module.exports= async(req, res, next) =>{
    const nombre= req.body.nombre;
    const existAccountName= await Admin.findOne({nombre: nombre});
    if(existAccountName){
        return res.status(422).json({error: 'Ya existe una cuenta con ese nombre.'});
    }
    next();
};