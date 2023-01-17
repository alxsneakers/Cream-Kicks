
const jwt = require('jwt-simple'); // Paquete para decodificar tokens
const moment = require('moment'); // Paquete moment
const SECRET = process.env.JWT; // Contraseña para encriptar los datos

// La funcion recibe como parametro todo el objeto del usuario
exports.createToken = function(user){
    // se generara el token con todos los datos de payload 
    const payload = {
        sub: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email:user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix() // el token caduca en 30 dias.
    };
    return jwt.encode(payload, SECRET); // devuelve el token codificado.
};