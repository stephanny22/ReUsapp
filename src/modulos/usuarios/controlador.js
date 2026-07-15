const db = require('../../DB/mysql');
const auth = require('../autenticacion');

const TABLA = 'Usuario';

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

    function usuarios() {
        return dbLocal.usuarios();
    }

    async function agregar(body) {

        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo
        };

        const respuesta = await dbLocal.agregar(TABLA, usuario);

        let insertId = body.id;

        if (!body.id || body.id == 0) {
            insertId = respuesta.insertId;
        }

        if (body.usuario || body.password) {

            await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password
            });

        }

        return respuesta;

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
        usuarios,
        contar
    };

};