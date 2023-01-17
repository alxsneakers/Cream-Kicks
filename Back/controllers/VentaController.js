const fs = require('fs');
const handlebars = require('handlebars');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');
// Este controlador tiene (el modelo de venta, dventa, envio)
const Venta= require('../models/venta');
const Dventa= require('../models/dventa');
const Producto= require('../models/products');
const Carrito= require('../models/carrito');
const Envio= require('../models/envio');


const registro_compra_cliente= (async (req, res)=>{
    const data= req.body;
    const detalles= data.detalles;


    const venta_last= await Venta.find().sort({creado: -1});
    let serie;
    let correlativo;
    let n_venta;

    // calcula el numero de serie de la venta (nventa)
    if(venta_last.length == 0){
        serie= '001';
        correlativo= '000001';
        n_venta= serie + '-' + correlativo;
    }else{ // >= 1 registro en venta (nventa)
        const last_venta= venta_last[0].nventa; // imprime el nventa anterior
        const arr_venta= last_venta.split('-'); // 0- Serie | 1- Correlativo 
        
       if(arr_venta[1] != '999999'){ // suma un numero al correlativo
        const new_correlativo= zfill(parseInt(arr_venta[1])+1, 6);
        n_venta= arr_venta[0] + '-' + new_correlativo;
       }else if(arr_venta[1] == '999999'){ // pasar a la siguiente serie
        const new_serie= zfill(parseInt(arr_venta[0])+1, 3);
        n_venta= new_serie + '-000001'; // al ser una nueva serie, resteo el correlativo
       }
    }

    // inserto el numero de venta (nventa)
    data.nventa= n_venta;
    data.estado= 'procesando';

    const venta= await Venta.create(data);

    detalles.forEach(async element => {
        element.venta= venta._id;
        await Dventa.create(element);
        // busco el producto en la bdd y le resto el stock, asi por cada producto comprado.
        const element_producto= await Producto.findById({_id: element.producto});
        // aumento en +1 el numero de ventas
        const new_nventas= parseInt(element_producto.nventas) + 1;
        // resto el stock
        element_producto.tallas.forEach(element2 =>{
            if(element2.talla == element.talla){
                element2.stock= parseInt(element2.stock) - 1;
            }
        });
        // aplico los cambios
        await Producto.findByIdAndUpdate({_id: element.producto}, {
            tallas: element_producto.tallas,
            nventas: new_nventas
        });
        // despues de realizar la compra, elimino el carrito
        await Carrito.remove({cliente: data.cliente});
    });
    res.status(200).json({idVenta: venta._id});
});


const enviar_correo_compra= (async (req, res)=>{

    const idVenta= req.params['idVenta'];

    const readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
        user: process.env.GMAIL_ACC,
        pass: process.env.GMAIL_PASS
        }
    }));

    // recupero la venta para poder poner informacion en el correo.
    const venta= await Venta.findById({_id: idVenta}).populate('cliente');
    const dventa= await Dventa.find({venta: idVenta}).populate('producto');
    const precio_envio= await Envio.findById({_id: venta.envio}, {precio: 1, _id: 0});

    const cliente= venta.cliente.nombre + ' ' + venta.cliente.apellidos;
    const fecha= new Date(venta.creado);
    

    readHTMLFile(process.cwd() + '/mail.html', (err, html)=>{
                        
        let rest_html = ejs.render(html, {data: dventa, cliente: cliente, fecha:fecha, _id: venta._id, subtotal: venta.subtotal, precio_envio: precio_envio});
    
        var template = handlebars.compile(rest_html);
        var htmlToSend = template({op:true});
    
        var mailOptions = {
            from: process.env.GMAIL_ACC,
            to: 'hectormartindama@gmail.com', //venta.cliente.email
            subject: 'Gracias por tu compra, Mi Tienda',
            html: htmlToSend
        };
        res.status(200).send({data:true});
        transporter.sendMail(mailOptions, function(error, info){
            if (!error) {
                console.log('Email sent: ' + info.response);
            }
        });
      
    });
});

// rellena con ceros a la hora de sumar el correlativo
function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = '0';
    
    if (width <= length) {
        if (number < 0) {
             return ('-' + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ('-' + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}





module.exports={
    registro_compra_cliente,
    enviar_correo_compra
};