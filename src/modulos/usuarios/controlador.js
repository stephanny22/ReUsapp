const db = require('../../DB/mysql');
const auth = require('../autenticacion');

const TABLA = 'usuario';

module.exports = function (dbInyectada) {

    let dbLocal = dbInyectada;

    if (!dbLocal) {
        dbLocal = require('../../DB/mysql');
    }

    function todos() {
        return dbLocal.todos(TABLA);
    }

    function uno(id) {
        return dbLocal.uno(TABLA, id);
    }

    async function agregar(body) {

        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo
        };

        const respuesta = await dbLocal.agregar(TABLA, usuario);

        console.log('respuesta', respuesta);

        let insertId = 0;

        if (body.id == 0) {
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }

        let respuesta2 = '';

        if (body.usuario || body.password) {
            respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password
            });
        }

        return respuesta2;
    }

    function eliminar(id) {
        return dbLocal.eliminar(TABLA, id);
    }

    return {
        agregar,
        todos,
        uno,
        eliminar
    };

};