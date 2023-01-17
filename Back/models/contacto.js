// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const ContactoSchema= Schema({
    nombre: {
            type: String,
            required: true
    },
    asunto: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    creado: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

// exporta el esquema para que lo puedean utilizar otros archivos JS.
module.exports = mongoose.model('contacto', ContactoSchema);



