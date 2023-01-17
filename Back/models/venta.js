// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion
const VentaSchema= Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'cliente',
        required: true
    },
    nventa: { // numero interno que identifica a una venta
        type: String,
        required: true
    },
    subtotal: { 
        type: Number,
        required: true
    },
    metodo: { // en un futuro por si tenemos mas de un metodo de pago
        type: String
    },
    envio: { // tipo de envio elegido
        type: Schema.ObjectId,
        ref: 'envio',
        required: true
    },
    transaccion: { // identificador de la venta paypal
        type: String,
        required: true
    },
    cupon: {
        type: String
    },
    estado: { 
        type: String,
        required: true
    },
    direccion: {
        type: Schema.ObjectId,
        ref: 'direccion',
        required: true
    },
    nota: {
        type: String
    },
    creado: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

// exporta el esquema para que lo puedean utilizar otros archivos JS.
module.exports = mongoose.model('venta', VentaSchema);