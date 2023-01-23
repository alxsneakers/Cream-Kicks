
// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// esquema para la coleccion (admin)
const AdminSchema= Schema({
    nombre: {
        type: String,
        required: true // campo obligatorio
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgPerfil: {
        type: Object
    }

});

// exporta el esquema para que lo puedean utilizar otros archivos JS.
module.exports = mongoose.model('admin', AdminSchema);