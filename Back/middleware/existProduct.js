//const Product= require('../models/products');


/*module.exports= async(req, res, next) => {
    let encontrado= false;
    const idProducto= req.params['id'];
    const productos= await Product.find();

    // recorro todos los productos
    for(let p of productos){
        if(p._id == idProducto){
            encontrado= true;
        }
    }
    if(encontrado == false){
        res.status(401).json({error: 'El producto no existe.'});
    }
    next();
};*/






