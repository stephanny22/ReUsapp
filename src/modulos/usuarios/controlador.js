const db = require('../../DB/mysql');
const auth = require('../autenticacion');
const bcrypt = require('bcrypt');

const TABLA = 'usuario';

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

    function totalUsuarios() {
        return dbLocal.totalUsuarios();
    }

    async function agregar(body) {

        const usuario = {
            id: body.id,
            tipo_doc: body.tipo_doc,
            num_doc: body.num_doc,
            nombres: body.nombres,
            apellidos: body.apellidos,
            email: body.email,
            telefono: body.telefono,
            direccion: body.direccion,
            fecha_nacimiento: body.fecha_nacimiento,
            genero: body.genero,
            contrasenia: await bcrypt.hash(body.contrasenia, 10),
            id_tipo_usuario: body.id_tipo_usuario || 2
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

    function eliminar(body) {
        return dbLocal.eliminar(TABLA, body);
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
        totalUsuarios,
        contar

    };

};