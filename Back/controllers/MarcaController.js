const marca = require('../models/marca');
const Marca= require('../models/marca');


const registro_marca= (async (req, res)=>{
    const nombre= req.body.nombre;
    // creo la marca
    const marca= new Marca({
        nombre: nombre
    });
    const saveMarca= marca.save();
    res.status(200).json({message: 'Marca creada con exito.'});
});

const all_marcas= (async (req, res)=>{
    const marcas= await Marca.find(null, {nombre: 1, _id: 1}).sort([['creado', -1]]);
    res.status(200).json(marcas);
});

const eliminar_marca= (async (req, res)=>{
    const idMarca= req.params['id'];
    const marca= await Marca.findByIdAndDelete({_id: idMarca}).then((doc) => {
        if(!doc){
            return res.status(404).send({message: 'Marca no encontrada.'});
        }
        return res.status(200).json({message: 'Marca eliminada con exito.'});
    }).catch((error) => {
        return res.status(503).send({message: 'Servidor caido, Intentelo más tarde.'});
    });
});


const eliminar_seleccionados_marca= (async (req, res)=>{
    // separo los ids por comas (234,345,453) a ['234', '345', '453']
    const ids= req.params['idMarcas'].split(',');
    const marcas= await Marca.deleteMany({_id: { $in: ids}});
    res.status(200).json('Marcas eliminadas con exito');
});

// devuelve todas las marcas
const obtener_marcas= (async (req, res) =>{
    const marcas= await Marca.find(null, {nombre: 1, _id: 0});
    res.status(200).json(marcas);
});






module.exports={
    registro_marca,
    all_marcas,
    eliminar_marca,
    obtener_marcas,
    eliminar_seleccionados_marca
};