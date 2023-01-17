const Carrito= require('../models/carrito');

// valida que no haya 2 productos iguales en el carrito
module.exports= async(req, res, next) =>{
    const idCliente= req.body.cliente;
    const idProducto= req.body.producto;
    const historial_carrito= await Carrito.find({cliente: idCliente, producto: idProducto});
    if(historial_carrito.length >= 1){
        return res.status(422).json({message: 'Ya tienes este producto en el carrito'});
    }
    next();
};