const db = require('../../DB/mysql');
const bcrypt = require('bcrypt'); 
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
            contrasenia: body.contrasenia,
            // Si no llega, se registra como Cliente
            id_tipo_usuario: body.id_tipo_usuario || 2
        };
        usuario.contrasenia = await bcrypt.hash(body.contrasenia, 10);
console.log("dbLocal =", dbLocal);
console.log("Método agregar =", dbLocal?.agregar);
        return dbLocal.agregar(TABLA, usuario);
    }

    function eliminar(body) {
        return dbLocal.eliminar(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        eliminar,
        usuarios,     
        totalUsuarios
    };
};
