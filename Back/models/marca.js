// imports de mongoose
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const MarcaSchema= Schema({
    nombre: {
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
module.exports = mongoose.model('marca', MarcaSchema);



// modelo schema para documentacion de OPEN API
