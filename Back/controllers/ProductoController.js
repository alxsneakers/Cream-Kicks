const Product= require('../models/products');
const fs = require('fs-extra'); // permite manegar archivos.
const path= require('path');
const { default: mongoose, mongo } = require('mongoose');


// crea un producto en la bdd.
const registro_producto= (async (req, res)=>{
    const dataProducto = req.body;
    const tallas= JSON.parse(dataProducto.tallaStockArray);    
    let stockTotal=0;

    // recupero el nombre de la img.
    const imgPath= req.files.portada.path; // uploads/productos/dpdnk12DXeyVz_TdpW2eiCF_.webp
    const portada= imgPath.split('/')[2]; // dpdnk12DXeyVz_TdpW2eiCF_.webp

    //calculo el stock total
    tallas.forEach(element =>{
        stockTotal= stockTotal + parseInt(element.stock);
    });

    // creo el prducto
    const product= new Product({
        nombre: dataProducto.nombre,
        marca: dataProducto.marca,
        tallas: tallas,
        sku: dataProducto.sku,
        stockTotal: stockTotal,
        publicado: dataProducto.publicado,
        precioCompra: dataProducto.precioCompra,
        precioVenta: dataProducto.precioVenta,
        portada: portada
    });
    const saveProduct= product.save();
    res.status(200).json({message: 'Producto creado con exito.'});
});


// Devuelve todos los productos ordenados por fecha. (Es decir el mas reciente arriba).
const all_producto= (async (req, res)=>{ 
    const products= await Product.find(null, {nombre: 1, marca: 1, sku: 1, portada: 1, tallas: 1, galeria: 1, publicado: 1, _id: 1}).sort([['creado', -1]]);
    res.status(200).json(products);
});


// recupera la info del producto con el (id) de la bdd.
const obtener_producto= (async (req, res)=>{
   try{
     // obtengo el (id) desde el parametro de la url es decir (/obtenerProducto/638249bf522c9c1b02807a33).
     const idProducto= req.params['id'];
     // recupero el producto de la bdd con el id del parametro de la peticion.
     const producto= await Product.findById({_id: idProducto}, {nombre: 1, marca: 1, portada: 1, sku: 1, tallas: 1, stock: 1, precioCompra: 1, precioVenta:1, tienda: 1, _id: 0});
     res.status(200).json(producto); // devuelve el producto encontrado.
   }catch(error){ // lo devuelvo en array para ponerlo en la tabla del fronted.
    res.status(422).json({error: error});
   } 
});

const obtener_galeria= (async (req, res)=>{
    const idProducto= req.params['id'];
    const product= await Product.findById({_id: idProducto}, {galeria: 1});
    res.status(200).json(product.galeria);
});

const actualizar_producto= (async (req, res)=>{
    const { nombre, marca, sku, tallas, stock, precioCompra, precioVenta, tienda } = req.body;
    const idProducto= req.params['id']; // obtengo el id desde el parametro de la url.

    if(req.files){ // si img -> la actualizo
        const imgPath= req.files.portada.path; 
        const portada= imgPath.split('/')[2];

        const producto= await Product.findByIdAndUpdate({_id: idProducto}, {
            nombre: nombre,
            marca: marca,
            tallas: tallas,
            sku: sku,
            stock: stock,
            tienda: tienda,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            portada: portada
        });

        // como se ha actualizo la portada, elimino la img anterior para no colapsar el servidor.
        fs.stat('./uploads/productos/'+producto.portada, function(err){
            if(!err){
               fs.unlink('./uploads/productos/' + producto.portada, (err) =>{
                    if(err) throw err;
               });
            }
        });
        res.status(200).json({updateProduct: 'OK'});

    }else{ // no img -> dejo la img anterior
        // actualizo el producto.
        const producto= await Product.findByIdAndUpdate({_id: idProducto}, {
            nombre: nombre,
            marca: marca,
            tallas: tallas,
            sku: sku,
            stock: stock,
            tienda: tienda,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
        });
        res.status(200).json({updateProduct: 'OK'});
    }
});


const eliminar_producto= (async (req, res)=>{
    const idProducto= req.params['id']; // obtengo el id desde el parametro de la url.
    const producto= await Product.findByIdAndDelete({_id: idProducto});
    res.status(200).json({deleteProduct: 'OK'});
});


const agregar_img_galeria= (async (req, res)=>{
    const idProducto= req.params['id'];
    // agrego la img a la galeria del producto.
    const imgPath= req.files.imagen.path;
    const imagen_name= imgPath.split('/')[2];

    const producto= await Product.findByIdAndUpdate({_id: idProducto}, {
        $push: { galeria: {
            imagen: imagen_name,
            _id: req.body._id // identificador unico para la img
        }}
    });
    res.status(200).send({addGalery: 'OK'});
});

const eliminar_img_galeria= (async (req, res)=>{
    const idProducto= req.params['id'];
    const producto= await Product.findByIdAndUpdate({_id: idProducto}, {
        $pull: { galeria: {
            _id: req.body._id // identificador unico para la img
        }}
    });
    res.status(200).json({deleteImgGalery: 'OK'});
});

// --------------- METODOS DE AMBITO PUBLICO -----------------------

// devuelve la portada del producto.
const obtener_portada= (async (req, res)=>{
    /* Obtengo la img desde un parametro de la url es decir (/obtenerPortada/81pszDORNtooWlpBFVkH2XDO.jpg -> Nombre de la img) */
    const img= req.params['img'];

    fs.stat('./uploads/productos/'+img, function(err){
        if(!err){
            const path_img= './uploads/productos/'+img;
            // envio la img al frontend
            res.status(200).sendFile(path.resolve(path_img));
        }else{ // si la img no existe, le envio una por defecto.
            res.status(404).sendFile(path.resolve('./uploads/defaultImage.png'));
        }
    });
});



/* filtra los productos por el campo nombre, en el filtro de la url.
 http://localhost:4201/api/products/listar_productos_publico?filtroName=noTienda
 devuelve el producto que se llame "noTienda" en este caso */
const listar_productos_publico= (async (req, res)=>{
    const filtro= req.query.filtroName;
    const productos= await Product.find({nombre: new RegExp(filtro, 'i'), publicado: true}, {__v: 0, precioCompra: 0});
    res.status(200).json(productos);
});

const obtener_producto_publico= (async (req, res)=>{
    const id= req.params['id'];
    const producto= await Product.findOne({_id: id, publicado: true}, { __v: 0, precioCompra: 0});
    res.status(200).json(producto);
});

// devuelve productos segun la marca del parametro url
const listar_productos_recomendados_publico= (async (req, res)=>{
    const filtro= req.params['marca'];
    const productos= await Product.find({marca: filtro, publicado: true}, {nombre: 1, precioVenta: 1, portada: 1, _id: 1}).limit(8);
    res.status(200).json(productos);
});

// https://www.mongodb.com/community/forums/t/how-to-query-an-object-array-and-return-only-objects-that-match-mongo-mongoose/123117
// obtiene el stock del producto por la talla
const get_talla_stock_producto= (async (req, res)=>{
    const id= req.params['id']; // obtengo el id desde el parametro de la url.
    const talla= req.params['talla'];
    const producto= await Product.findById({_id: id});
    let stock;

    producto.tallas.forEach(element =>{
        if(element.talla == talla){
            stock= element.stock;
        }
    });
    res.status(200).json(stock);
});


const eliminar_seleccionados_producto= (async (req, res)=>{
    // separo los ids por comas (234,345,453) a ['234', '345', '453']
    const ids= req.params['idProductos'].split(',');
    const productos= await Product.deleteMany({_id: { $in: ids}});
    res.status(200).json({message: 'Productos eliminadas con exito'});
});



/* ----------------------------------------- ------------------------------------- */













module.exports = {
    registro_producto,
    all_producto,
    obtener_portada,
    obtener_producto,
    actualizar_producto,
    eliminar_producto,
    agregar_img_galeria,
    eliminar_img_galeria,
    obtener_galeria,
    listar_productos_publico,
    obtener_producto_publico,
    listar_productos_recomendados_publico,
    get_talla_stock_producto,
    eliminar_seleccionados_producto
};