const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors= require('cors');
// npm
const { swaggerDocs }= require('./swagger/swagger');

// socket.io
const server= require('http').createServer(app);
const io= require('socket.io')(server, {
    cors: {origin: '*'} // acepta peticiones desde cualquier direccion
});
io.on('connection', function(socket){
    // elimina un producto del carrito in real time
    socket.on('delete-carrito', function(data){
        io.emit('update-carrito-delete', data);
        console.log(data);
    });
    // añade un producto al carrito in real time
    socket.on('add-carrito', function(data){
        io.emit('update-carrito-add', data);
        console.log(data);
    });
});

require('dotenv').config();
// Obtiene los routers
const clienteRouter = require('./routes/cliente');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/producto');
const cuponRouter= require('./routes/cupon');
const marcaRouter= require('./routes/marca');
const carritoRouter= require('./routes/carrito');
const direccionRouter= require('./routes/direccion');
const envioRouter= require('./routes/envio');
const ventaRouter= require('./routes/venta');
const descuentoRouter= require('./routes/descuento');
// descifra los errores
const handleErrors = require('./middleware/handleErrors');

// Constantes.
const PORT= process.env.PORT || 3000;   

// Conexion bbdd 
mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('DataBase connect successfully.');
}).catch((err)=>{
    console.log('error connecting MongoDB: ' + err.message);
});

// Puesta en marcha del servidor
server.listen(PORT, ()=>{
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
    swaggerDocs(app, PORT);
});




/* 28 - 34 Se usa porque al estar separado el front y el back en proyectos distintos,
 cuando se suban a produccion van a estar cada uno en un droplet (VPS - Servidores privados virtuales) 
 diferente Back y Front Estan en puertos diferente y se da los permisos para qe se envien la data y 
 no de problemas de cors */

// Las siguientes lineas son los permisos que permiten la conexion comunicacion entre back y front
app.use(handleErrors);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api', clienteRouter); // Asigna los routes a las rutas.
app.use('/api', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/cupones', cuponRouter);
app.use('/api/marcas', marcaRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/direcciones', direccionRouter);
app.use('/api/envios', envioRouter);
app.use('/api/ventas', ventaRouter);
app.use('/api/descuentos', descuentoRouter);


module.exports = app;