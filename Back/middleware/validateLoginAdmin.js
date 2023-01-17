const Admin= require('../models/admin');
const bcrypt = require('bcrypt');

// Controla que el login es correcto.
module.exports = async(req, res, next) =>{
    const {email, password} = req.body;
    const user= await Admin.findOne({email: email});
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password);

    if(!(user && passwordCorrect)){
        return res.status(401).json({error: 'Email o Contraseña incorrecta.'});
    }
    next(); // todo OK, vete a la siguiente ruta.
};
