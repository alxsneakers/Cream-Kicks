const jwt= require('jsonwebtoken');


/* comprueba que el token de el header es valido y si es valido,
    devuelve el id del usuario para hacer operaciones con ese usuario.
*/
module.exports = (req, res, next) =>{
    const authorization= req.get('authorization');
    let token= '';
    // comprueba si la sintaxis del tokene es correcta.
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token= authorization.substring(7);
    }
    // Descodifico el token para saber si el valido.
    const decodedToken= jwt.verify(token, process.env.JWT);
    // Compruebo si tiene el token.
    if(!token || !decodedToken.sub){
        return res.status(401).json({error: 'token missing or invalid'});
    }
    // Busco al usuario con el id del usuario guardado en el token.
    const {sub: userId}= decodedToken;
    req.userId= userId;
    next(); // vete a la siguiente ruta.
};