const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../autenticacion');

module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

    async function login(usuario, password) {

        const data = await db.query(TABLA, { usuario: usuario });

        return bcrypt.compare(password, data.password)
            .then((resultado) => {

                if (resultado === true) {
                    return auth.asignarToken({ ...data });
                    return data;
                
                } else {
                    throw new Error('Usuario o contraseña incorrectos');
                }

            });

    }

    async function agregar(data) {

        const authData = {
            id: data.id,
        };

        if (data.usuario) {
            authData.usuario = data.usuario;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(
                data.password.toString(),
                10
            );
        }

        return db.agregar(TABLA, authData);

    }

    return {
        agregar,
        login,
    };

};