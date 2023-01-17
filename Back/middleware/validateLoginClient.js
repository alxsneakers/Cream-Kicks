const Cliente= require('../models/cliente');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) =>{
    const {email, password} = req.body;
    const user= await Cliente.findOne({email: email});
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password);

    if(!(user && passwordCorrect)){
       return res.status(401).json({error: 'Email o Contraseña incorrecta.'});
    }
    next(); // vete a la siguiente ruta.
};
