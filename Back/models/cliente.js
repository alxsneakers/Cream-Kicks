

// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion (cliente)
const ClienteSchema= Schema({
    nombre: {
        type: String,
        required: true // campo obligatorio
    },
    apellidos: {
        type: String,
        required: true
    },
    pais: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },  
    f_nacimiento: {
        type: String
    },
    genero: {
        type: String
    },
    dni: {
        type: String
    }
});

module.exports = mongoose.model('cliente', ClienteSchema);