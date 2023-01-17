const Envio= require('../models/envio');



const registro_envio= (async (req, res)=>{
    const data= req.body;
    // creo el tipo de envio
    const envio= await new Envio({
        tipo: data.tipo,
        tiempo: data.tiempo,
        precio: data.precio
    });
    const saveEnvio= envio.save();
    res.status(200).json({message: 'Tipo de envio creado con exito.'});
});

/* ---- METODO PUBLICO ---------  */
const obtener_tipos_envio= (async (req, res)=>{
    const envios= await Envio.find(null, { tipo: 1, tiempo: 1, precio: 1, _id: 1});
    res.status(200).json(envios);
});


module.exports= {
    registro_envio,
    obtener_tipos_envio
};