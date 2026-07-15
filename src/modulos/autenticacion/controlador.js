const TABLA = 'usuario';
const bcrypt = require('bcrypt');
const auth = require('../../autenticacion');

module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

    async function login(email, password) {
            console.log("Email recibido:", email);


        const data = await db.query(TABLA, 'email', email);
        
            console.log("Resultado consulta:", data);


        if (!data) {
            throw new Error('Usuario no encontrado');
        }

        return bcrypt.compare(password, data.contrasenia)
            .then((resultado) => {

                if (resultado) {

                    const token = auth.asignarToken({
                        id: data.id,
                        email: data.email,
                        tipo: data.id_tipo_usuario
                    });

                    return {
                        token,
                        usuario: data
                    };

                } else {
                    throw new Error('Usuario o contraseña incorrectos');
                }

            });

    }

    return {
        login
    };

};