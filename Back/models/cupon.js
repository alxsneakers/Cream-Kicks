// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion (cupon)
const CuponSchema= Schema({
    codigo: {
        type: String,
        required: true
    },
    tipo: { // porcentaje o PrecioFijo
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    limite: { // cantidad de cupones disponibles
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
module.exports = mongoose.model('cupon', CuponSchema);