
/* Sirve para dar formato a los errores del servidor */


// Errores del servidor.
const ERROR_HANDLERS= {
    JsonWebTokenError: (res) =>
        res.status(401).json({errors: 'token missing or invalid'}),
    defaultError: res => res.status(500).end()
};


module.exports = (error, req, res, next) =>{
    console.log(error.name);
    const handler= ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
    handler(res, error);
}; 