const db = require('../../DB/mysql');

const TABLA = 'Intercambio';

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

    function intercambios() {
        return dbLocal.intercambios();
    }

    function agregar(body) {
        return dbLocal.agregar(TABLA, body);
    }

    function eliminar(id) {
        return dbLocal.eliminar(TABLA, id);
    }

    function contar() {
        return dbLocal.contar(TABLA);
    }


    return {
        todos,
        uno,
        agregar,
        eliminar,
        intercambios,
        contar
    };

};
