const Direccion= require('../models/direccion');


const registro_direccion= (async (req, res)=>{
    const data = req.body;
    // creo la direccion
    const direccion= await new Direccion({
        cliente: data.cliente,
        destinatario: data.destinatario,
        dni: data.dni,
        codigoPostal: data.codigoPostal,
        calle: data.calle,
        provincia: data.provincia,
        ciudad: data.ciudad,
        telefono: data.telefono,
        principal: data.principal
    });
    const saveDireccion= direccion.save();
    res.status(200).json({message: 'Dirección creada con exito.'});
});

const obtener_direcciones_cliente= (async (req, res)=>{
    const idCliente= req.params['idCliente'];
    const direcciones= await Direccion.find({cliente: idCliente}, {_id: 1,destinatario: 1, calle: 1, provincia: 1, ciudad: 1, codigoPostal: 1, principal: 1}).populate('cliente').sort({creado: -1});
    res.status(200).json(direcciones);
});

// cambiar la direccion principal
const cambiar_direccion_principal_cliente= (async (req, res)=>{
    const idCliente= req.params['idCliente'];
    const id= req.params['id'];

    const direcciones= await Direccion.find({cliente: idCliente});

    // pasa todas las direcciones a principal false.
    direcciones.forEach(async element =>{
        await Direccion.findByIdAndUpdate({_id: element._id}, {principal: false});
    });
    // pongo la direccion selecciona a princiopal true
    const DireccionUpdate= await Direccion.findByIdAndUpdate({_id: id}, {principal: true});
    res.status(200).json({message: 'Se ha cambiado la direccion a principal correctamente.'});
});

const obtener_direccion_principal_cliente= (async (req, res)=>{
    const idCliente= req.params['idCliente'];
    const direccion= await Direccion.findOne({cliente: idCliente, principal: true});
    res.status(200).json(direccion);
});


module.exports={
    registro_direccion,
    obtener_direcciones_cliente,
    cambiar_direccion_principal_cliente,
    obtener_direccion_principal_cliente
};