const db = require('../../DB/mysql');

const TABLA = 'Producto';

module.exports = function (dbInyectada) {

    let dbLocal = dbInyectada;

    if (!dbLocal) {
        dbLocal = db;
    }

    function todos() {
        return dbLocal.todos(TABLA);
    }

    function uno(id) {
        return dbLocal.uno(TABLA, id);
    }

    function productos() {
        return dbLocal.productos();
    }

    function totalProductos() {
        return dbLocal.totalProductos();
    }

    function agregar(body) {
        return dbLocal.agregar(TABLA, body);
    }

    function eliminar(id) {
        return dbLocal.eliminar(TABLA, id);
    }

    return {
        todos,
        uno,
        agregar,
        eliminar,
        productos,
        totalProductos
    };

};