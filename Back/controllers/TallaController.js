const Talla= require('../models/talla');



const registro_talla= (async (req, res)=>{
    const data= req.body.talla;
    // creo el tipo de envio
    const talla= await new Talla({
        talla: data
    });
    const saveTalla= talla.save();
    res.status(200).json({message: 'Talla creada con exito.'});
});

/* ---- METODO PUBLICO ---------  */
const obtener_tallas= (async (req, res)=>{
    const tallas= await Talla.find(null, { talla: 1});
    res.status(200).json(tallas);
});


module.exports= {
    registro_talla,
    obtener_tallas
};