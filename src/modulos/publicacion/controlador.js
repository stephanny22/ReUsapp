const db = require('../../DB/mysql');

const TABLA = 'publicacion';

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
    function publicaciones(){
        return db.publicaciones();
    }
    function publicacion(id){
        return db.publicacion(id);
    }
    return{
    todos,
    uno,
    agregar,
    eliminar,
    publicaciones,
    publicacion
    }
}