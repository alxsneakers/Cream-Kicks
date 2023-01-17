// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion
const DescuentoSchema= Schema({
    titulo: {
        type: String,
        required: true
    },
    banner: { // img del descuento
        type: String,
        required: true
    },
    descuento: {
        type: Number,
        required: true
    },
    fecha_inicio: {
        type: String,
        required: true
    },
    fecha_fin: {
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
module.exports = mongoose.model('descuento', DescuentoSchema);