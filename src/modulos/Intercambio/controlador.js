const db = require('../../DB/mysql');
const producto = require('../producto');

const TABLA = 'intercambio';

module.exports =  function (dbinyectada){

    let db = dbinyectada;
    if(!db){
        db = require('../../DB/mysql');
    }
    function todos(){
    return db.todos(TABLA)
    }
    function uno(id){
        return db.uno(TABLA, id)
    }
    function eliminar(body){
        return db.eliminar(TABLA, body)
    }
    function agregar(body){
        return db.agregar(TABLA, body)
    }
    function solicitud(body){
        return db.solicitud(body)
    }
    async function solicitud(body){

        if(body.producto.tipo === "nuevo"){

            const resultado = await producto.agregar({

                nombre: body.producto.nombre,
                cantidad: body.cantidad,
                precio: body.producto.precio,
                url_imagen: body.producto.url_imagen,
                estado: body.producto.estado,
                id_propietario: body.idUsuario,
                id_subcategoria: body.producto.idSubcategoria

            });

            body.producto.id = resultado.insertId;
        }

        return db.solicitud(body);
    }
    return{
    todos,
    uno,
    agregar,
    eliminar,
    solicitud
    }
}