// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion
const CarritoSchema= Schema({
    producto: {
        type: Schema.ObjectId,
        ref: 'producto',
        required: true
    },
    cliente: {
        type: Schema.ObjectId,
        ref: 'cliente',
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    comprado: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

// exporta el esquema para que lo puedean utilizar otros archivos JS.
module.exports = mongoose.model('carrito', CarritoSchema);