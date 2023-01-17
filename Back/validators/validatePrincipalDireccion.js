const Direccion= require('../models/direccion');

// valida que solo pueda tener una direccion principal por cliente.
module.exports= async(req, res, next) =>{
    const { cliente, principal } = req.body;
    if(principal){
        const existPrincipal= await Direccion.findOne({cliente: cliente, principal: true});
        if(existPrincipal){
            return res.status(422).json({error: 'Ya tienes una direccion principal. Solo puedes tener una dirección principal.'});
        }
    }
    next();
};