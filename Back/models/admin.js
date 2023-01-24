const mongoose= require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('admin', AdminSchema);