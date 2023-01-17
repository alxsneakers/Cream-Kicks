// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion
const EnvioSchema= Schema({
    tipo: {
        type: String,
        required: true
    },
    tiempo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    creado: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

// exporta el esquema para que lo puedean utilizar otros archivos JS.
module.exports = mongoose.model('envio', EnvioSchema);