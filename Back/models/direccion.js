// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion
const DireccionSchema= Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'cliente',
        required: true
    },
    destinatario: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    principal: { // Dir principal (true) --> Dir Secuandario (false)
        type: Boolean,
        required: true
    },
    creado: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

// exporta el esquema para que lo puedean utilizar otros archivos JS.
module.exports = mongoose.model('direccion', DireccionSchema);