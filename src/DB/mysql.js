// Funciones para consultar la base de datos

const mysql = require('mysql2');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion;

function conMysql() {

    conexion = mysql.createConnection(dbConfig);

    conexion.connect((err) => {

        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        } else {
            console.log('DB Conectada');
        }

    });

    conexion.on('error', (err) => {

        console.log('[db err]', err);

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }

    });

}

conMysql();

function todos(tabla) {

    return new Promise((resolve, reject) => {

        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result);

        });

    });

}

function uno(tabla, id) {

    return new Promise((resolve, reject) => {

        conexion.query(
            `SELECT * FROM ${tabla} WHERE id = ?`,
            [id],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result[0]);

            }
        );

    });

}

function agregar(tabla, data) {

    return new Promise((resolve, reject) => {

        conexion.query(
            `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,
            [data, data],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

    });

}

function eliminar(tabla, data) {

    return new Promise((resolve, reject) => {

        conexion.query(
            `DELETE FROM ${tabla} WHERE id = ?`,
            [data.id],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

    });

}


function contar(tabla) {

    return new Promise((resolve, reject) => {

        conexion.query(`SELECT COUNT(*) AS total FROM ${tabla}`, (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result);

        });

    });

}

function query(tabla, consulta) {
function query(tabla, campo, valor) {


    return new Promise((resolve, reject) => {

        conexion.query(
            `SELECT * FROM ${tabla} WHERE ${campo} = ?`,
            [valor],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result[0]);

            }
        );

    });

}

function publicaciones() {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                p.id,
                p.titulo,
                p.descripcion,
                p.fecha_publicacion,
                p.visibilidad,

                pr.nombre AS producto,
                pr.precio,
                pr.estado,
                pr.url_imagen,

                u.nombres,
                u.apellidos,

                s.nombre AS subcategoria,
                c.nombre AS categoria

            FROM Publicacion p
            INNER JOIN Producto pr
                ON p.id_producto = pr.id
            INNER JOIN Usuario u
                ON pr.id_propietario = u.id
            INNER JOIN Subcategoria s
                ON pr.id_subcategoria = s.id
            INNER JOIN Categoria c
                ON s.id_categoria = c.id

            WHERE p.visibilidad = 'PUBLICO'
            ORDER BY p.fecha_publicacion DESC;
        `;

        conexion.query(sql, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
}


function publicacion(id) {
    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                p.id,
                p.titulo,
                p.descripcion,
                p.fecha_publicacion,

                pr.nombre AS producto,
                pr.precio,
                pr.estado,
                pr.url_imagen,

                u.id AS id_usuario,
                u.nombres,
                u.apellidos,

                s.nombre AS subcategoria,
                c.nombre AS categoria

            FROM Publicacion p

            INNER JOIN Producto pr
                ON p.id_producto = pr.id

            INNER JOIN Usuario u
                ON pr.id_propietario = u.id

            INNER JOIN Subcategoria s
                ON pr.id_subcategoria = s.id

            INNER JOIN Categoria c
                ON s.id_categoria = c.id

            WHERE p.id = ?
        `;


        conexion.query(sql, [id], (error, result) => {

            if(error) return reject(error);

            resolve(result[0]);

        });

    });
}

function totalUsuarios() {
    return new Promise((resolve, reject) => {


function usuarios(){

    return new Promise((resolve,reject)=>{

        const sql=`
        SELECT
            id,
            tipo_doc,
            num_doc,
            nombres,
            apellidos,
            email,
            telefono,
            direccion,
            fecha_nacimiento,
            genero
        FROM Usuario
        ORDER BY nombres;
        `;

        conexion.query(sql,(error,result)=>{

            if(error) return reject(error);

            resolve(result);

        });

    });

}

function intercambios() {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT

            i.id,
            i.estado,
            i.fecha_intercambio,

            p.nombre AS producto

        FROM Intercambio i

        INNER JOIN Producto_Intercambio pi
            ON pi.id_intercambio = i.id

        INNER JOIN Producto p
            ON p.id = pi.id_producto

        ORDER BY i.fecha_intercambio DESC;
        `;

        conexion.query(sql, (error, result) => {

            if (error) return reject(error);

            resolve(result);

        });

    });

}

function productos() {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT

            p.id,
            p.nombre,
            p.precio,
            p.estado,
            p.url_imagen,

            c.nombre AS categoria,

            u.nombres,
            u.apellidos

        FROM Producto p

        INNER JOIN Usuario u
            ON p.id_propietario=u.id

        INNER JOIN Subcategoria s
            ON p.id_subcategoria=s.id

        INNER JOIN Categoria c
            ON s.id_categoria=c.id

        ORDER BY p.id DESC;
        `;

        conexion.query(sql,(error,result)=>{

            if(error){
                return reject(error);
            }

            resolve(result);

        });

    });

}
module.exports = {

    todos,
    uno,
    agregar,
    eliminar,
    publicaciones,
    publicacion,
    query,

    contar,

    usuarios,

    productos,
    intercambios

}
function publicaciones() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                p.id,
                p.titulo,
                p.descripcion,
                p.fecha_publicacion,
                p.visibilidad,

                pr.nombre AS producto,
                pr.precio,
                pr.estado,
                pr.url_imagen,

                u.nombres,
                u.apellidos,

                s.nombre AS subcategoria,
                c.nombre AS categoria

            FROM Publicacion p

            INNER JOIN Producto pr
                ON p.id_producto = pr.id

            INNER JOIN Usuario u
                ON pr.id_propietario = u.id

            INNER JOIN Subcategoria s
                ON pr.id_subcategoria = s.id

            INNER JOIN Categoria c
                ON s.id_categoria = c.id

            WHERE p.visibilidad = 'PUBLICO'

            ORDER BY p.fecha_publicacion DESC;
        `;

        conexion.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result);

        });

    });

}

function publicacion(id) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT

                p.id,
                p.titulo,
                p.descripcion,
                p.fecha_publicacion,

                pr.nombre AS producto,
                pr.precio,
                pr.estado,
                pr.url_imagen,

                u.id AS id_usuario,
                u.nombres,
                u.apellidos,

                s.nombre AS subcategoria,
                c.nombre AS categoria

            FROM Publicacion p

            INNER JOIN Producto pr
                ON p.id_producto = pr.id

            INNER JOIN Usuario u
                ON pr.id_propietario = u.id

            INNER JOIN Subcategoria s
                ON pr.id_subcategoria = s.id

            INNER JOIN Categoria c
                ON s.id_categoria = c.id

            WHERE p.id = ?;
        `;

        conexion.query(sql, [id], (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result[0]);

        });

    });

}

function totalUsuarios() {

    return new Promise((resolve, reject) => {

        conexion.query(
            "SELECT COUNT(*) AS total FROM Usuario",
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result[0]);

            }
        );

    });

}

function usuarios() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT

                id,
                tipo_doc,
                num_doc,
                nombres,
                apellidos,
                email,
                telefono,
                direccion,
                fecha_nacimiento,
                genero

            FROM Usuario

            ORDER BY nombres;
        `;

        conexion.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result);

        });

    });

}

function productos() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT

                p.id,
                p.nombre,
                p.precio,
                p.estado,
                p.url_imagen,

                c.nombre AS categoria,

                u.nombres,
                u.apellidos

            FROM Producto p

            INNER JOIN Usuario u
                ON p.id_propietario = u.id

            INNER JOIN Subcategoria s
                ON p.id_subcategoria = s.id

            INNER JOIN Categoria c
                ON s.id_categoria = c.id

            ORDER BY p.id DESC;
        `;

        conexion.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result);

        });

    });

}

function intercambios() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT

                i.id,
                i.estado,
                i.fecha_intercambio,

                GROUP_CONCAT(p.nombre SEPARATOR ' ↔ ') AS productos

            FROM Intercambio i

            INNER JOIN Producto_Intercambio pi
                ON pi.id_intercambio = i.id

            INNER JOIN Producto p
                ON p.id = pi.id_producto

            GROUP BY
                i.id,
                i.estado,
                i.fecha_intercambio

            ORDER BY i.fecha_intercambio DESC;
        `;

        conexion.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result);

        });

    });

}

module.exports = {

    todos,
    uno,
    agregar,
    eliminar,

    contar,
    query,

    publicaciones,
    publicacion,

    totalUsuarios,

    usuarios,
    productos,
    intercambios

};