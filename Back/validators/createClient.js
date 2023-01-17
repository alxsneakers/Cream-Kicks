const Client= require('../models/cliente');



// Valida que el email se ha unico
module.exports= async(req, res, next) =>{
    const email= req.body.email;
    const existEmail= await Client.findOne({email: email});
    if(existEmail){
        return res.status(422).json({error: 'Ya existe una cuenta con ese email.'});
    }
    next(); // vete a la siguiente ruta.
};