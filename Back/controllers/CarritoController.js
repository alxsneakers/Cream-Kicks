const Carrito= require('../models/carrito');

const agregar_carrito_cliente= (async (req, res)=>{
    const data= req.body;
    const carrito= await Carrito.create(data);
    res.status(200).json({message: 'Se agrego el producto al carrito.'});
});

const obtener_carrito_cliente= (async (req, res)=>{
    const idCliente= req.params['idCliente'];
    const carrito_cliente= await Carrito.find({cliente: idCliente}).populate('producto');
    res.status(200).json(carrito_cliente);
});

const eliminar_carrito_cliente= (async (req, res)=>{
    const id= req.params['id'];
    const carrito= await Carrito.findByIdAndRemove({_id: id});
    res.status(200).json({message: 'Producto eliminado con exito'});
});

module.exports={
    agregar_carrito_cliente,
    obtener_carrito_cliente,
    eliminar_carrito_cliente
};