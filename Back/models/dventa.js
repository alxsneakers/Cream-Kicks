// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion
const DventaSchema= Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'cliente',
        required: true
    },
    producto: {
        type: Schema.ObjectId,
        ref: 'producto',
        required: true
    },
    venta: {
        type: Schema.ObjectId,
        ref: 'venta',
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    talla: {
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
module.exports = mongoose.model('dventa', DventaSchema);