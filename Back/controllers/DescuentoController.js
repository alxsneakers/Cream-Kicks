const Descuento= require('../models/descuento');
const fs = require('fs-extra'); // permite manegar archivos.
const path= require('path');

const registro_descuento= (async (req, res)=>{
    const data= req.body;

    const img_path= req.files.banner.path;
    const banner= img_path.split('/')[2];

    const descuento= new Descuento({
        titulo: data.titulo,
        descuento: data.descuento,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        banner: banner
    });
    const saveDescuento= descuento.save();
    res.status(200).json({message: 'OK'});
});


const listar_descuentos= (async (req, res)=>{
    const descuentos= await Descuento.find();
    res.status(200).json(descuentos);
});

// devuelve el banner del descuento.
const obtener_banner_descuento= (async (req, res)=>{
    /* Obtengo la img desde un parametro de la url es decir (/obtenerPortada/81pszDORNtooWlpBFVkH2XDO.jpg -> Nombre de la img) */
    const img= req.params['img'];

    fs.stat('./uploads/banners/'+img, function(err){
        if(!err){
            const path_img= './uploads/banners/'+img;
            // envio la img al frontend
            res.status(200).sendFile(path.resolve(path_img));
        }else{ // si la img no existe, le envio una por defecto.
            res.status(404).sendFile(path.resolve('./uploads/defaultImage.png'));
        }
    });
});

const obtener_descuento= (async (req, res)=>{
    const id= req.params['id'];

    const descuento= await Descuento.findById({_id: id});
    res.status(200).json(descuento);
});

const actualizar_descuento= (async (req, res)=>{
    const data = req.body;
    const idDescuento= req.params['id']; // obtengo el id desde el parametro de la url.

    if(req.files){ // si img -> la actualizo
        const imgPath= req.files.banner.path; 
        const banner_name= imgPath.split('/')[2];

        const descuento= await Descuento.findByIdAndUpdate({_id: idDescuento}, {
            titulo: data.titulo,
            descuento: data.descuento,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin,
            banner: banner_name            
        });

        // como se ha actualizo la portada, elimino la img anterior para no colapsar el servidor.
        fs.stat('./uploads/descuentos/'+descuento.banner, function(err){
            if(!err){
               fs.unlink('./uploads/descuentos/' + descuento.banner, (err) =>{
                    if(err) throw err;
               });
            }
        });
        res.status(200).json({message: 'Descuento actualizado con exito.'});

    }else{ // no img -> dejo la img anterior
        // actualizo el producto.
        const descuento= await Descuento.findByIdAndUpdate({_id: idDescuento}, {
            titulo: data.titulo,
            descuento: data.descuento,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin
        });
        res.status(200).json({message: 'Descuento actualizado con exito.'});
    }
});

const eliminar_descuento= (async (req, res)=>{
    const id= req.params['id']; // obtengo el id desde el parametro de la url.
    const descuento= await Descuento.findByIdAndDelete({_id: id}).then((doc) => {
        if(!doc){
            return res.status(404).send({message: 'Descuento no encontrado.'});
        }
        return res.status(200).json({message: 'Descuento eliminado con exito.'});
    }).catch((error) => {
        return res.status(503).send({message: 'Servidor caido, Intentelo más tarde.'});
    });
});

const obtener_descuento_activo= (async (req, res)=>{
    let descuentos= await Descuento.find().sort({creado: -1});
    let descuentos_activos=[];
    let today= Date.parse(new Date().toString())/1000;


    descuentos.forEach(descuento =>{
        let tt_inicio= Date.parse(convertir_fecha(descuento.fecha_inicio) + 'T00:00:00')/1000;
        let tt_fin= Date.parse(convertir_fecha(descuento.fecha_fin) + 'T23:59:59')/1000;

        if(today >= tt_inicio && today <= tt_fin){
            descuentos_activos.push(descuento);
        }
    });
    if(descuentos_activos.length >= 1){
        res.status(200).json(descuentos_activos);
    }else{
        res.status(404).json({message: 'No hay ningun descuento activo.'});
    }
});

// cambia formato (dd/mm/aaaa to aaaa-mm-dd)
function convertir_fecha(fecha){
    let newDate;
    const date= new Date(fecha);
    let day= date.getDate();
    let month= date.getMonth() + 1;
    let year= date.getFullYear();

    if(day < 10){
        day= '0'+day;
    }
    
    if(month < 10){
        newDate= `${year}-0${month}-${day}`;
    }else{
        newDate= `${year}-${month}-${day}`;
    }
    return newDate;
}





module.exports= {
    registro_descuento,
    listar_descuentos,
    obtener_banner_descuento,
    obtener_descuento,
    actualizar_descuento,
    eliminar_descuento,
    obtener_descuento_activo
};