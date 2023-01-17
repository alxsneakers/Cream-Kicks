const Cupon= require('../models/cupon');

// valida que el cupon exista para poder aplicarlo
module.exports= async(req, res) =>{
    const codigo= req.params['cupon'];
    const existCodigo= await Cupon.findOne({codigo: codigo});
    if(!existCodigo || existCodigo.limite == 0){
        return res.status(422).json({error: 'Cupon no valido', status: 422});
    }
    return res.status(200).json({message: 'Cupon valido', status: 200, data: existCodigo});
};
