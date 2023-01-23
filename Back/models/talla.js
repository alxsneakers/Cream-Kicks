// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;






// esquema para la coleccion
const TallaSchema= Schema({
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
module.exports = mongoose.model('talla', TallaSchema);