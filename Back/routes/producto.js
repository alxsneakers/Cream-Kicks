
// creo el router
const productRouter= require('express').Router();
const userExtractor = require('../middleware/userExtractor');
const productoController= require('../controllers/ProductoController');
const multiparty= require('connect-multiparty');
const PATH= multiparty({uploadDir: './uploads/productos'});



// metodos del router
productRouter
    .post('/createProduct', [PATH,userExtractor], productoController.registro_producto)
    .post('/getProductos', productoController.getProductoSearch)
    .get('/allProducts' ,userExtractor, productoController.all_producto)
    .get('/obtenerPortada/:img', productoController.obtener_portada)
    .get('/obtenerProducto/:id', userExtractor, productoController.obtener_producto)
    .put('/actualizarProducto/:id', [PATH, userExtractor], productoController.actualizar_producto)
    .delete('/deleteProduct/:id', userExtractor, productoController.eliminar_producto)
    .delete('/borrarSeleccionadosProducto/:idProductos', userExtractor, productoController.eliminar_seleccionados_producto)
    .put('/agregarImgGaleria/:id', [PATH, userExtractor], productoController.agregar_img_galeria)
    .put('/eliminarImgGaleria/:id', userExtractor, productoController.eliminar_img_galeria)
    .get('/obtenerGaleria/:id', userExtractor, productoController.obtener_galeria)
    .get('/listar_productos_publico', productoController.listar_productos_publico)
    .get('/obtener_producto_publico/:id', productoController.obtener_producto_publico)
    .get('/obtener_ultimos_productos', productoController.obtener_ultimos_productos)
    .get('/obtener_populares_productos', productoController.obtener_populares_productos)
    .get('/obtener_populares_productos_dash', productoController.obtener_populares_productos_dash)
    .get('/obtener_cantidad_marca/:marca', productoController.obtener_cantidad_marca)
    .get('/listar_productos_recomendados_publico/:marca', productoController.listar_productos_recomendados_publico)
    .get('/get_talla_stock_producto/:id/:talla', productoController.get_talla_stock_producto);

module.exports= productRouter;