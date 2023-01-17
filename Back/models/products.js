// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion (cliente)
const ProductSchema= Schema({
    nombre: {
        type: String,
        required: true // campo obligatorio
    },
    marca: {
        type: String,
        required: true
    },
    tallas: [
        {
            talla: {type: String, required: true},
            stock: {type: Number, required: true}
        }
    ],
    sku: { // Numero que indentifica el producto.
        type: String,
        required: true
    },
    portada: {
        type: Object,
        required: true
    },
    galeria: [ // Imagenes del producto
        {
            type: Object
        }
    ],
    precioCompra: {
        type: Number,
        required: true
    },
    precioVenta: {
        type: Number,
        required: true
    },
    stockTotal: {
        type: Number,
        required: true
    },
    nventas: {
        type: Number,
        default: 0
    },
    nestrellas: { // Estrellas de producto.
        type: Number,
        default: 0,
        required: true
    },
    publicado: {
        type: Boolean, // Es decir no esta en tienda. | Valores (true y false)
        default: false,
        required: true
    },
    creado: {
        type: Date,
        default: Date.now, // Fecha y hora en la que se ha añadido el producto.
        required: true
    }
});


// exporta el Schema
module.exports = mongoose.model('producto', ProductSchema);