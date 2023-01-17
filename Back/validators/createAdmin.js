const Admin= require('../models/admin');


// Valida que el email se ha unico y la contraseña se ha entre 6 y 20 caracteres.
module.exports= async(req, res, next) =>{
    const { email, password } = req.body;
    const existEmail= await Admin.findOne({email: email});
    if(existEmail){
        return res.status(422).json({error: 'Ya existe una cuenta con ese email.'});
    }
    if(password.length <= 6 || password.length >= 20){
        return res.status(422).json({error: 'Contrasena entre 6 y 20 caracetres.'});

    }
    next(); // vete a la siguiente ruta
};