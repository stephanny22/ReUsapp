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
            console.log('✅ DB Conectada');
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

function query(tabla, consulta) {

    return new Promise((resolve, reject) => {

        conexion.query(
            `SELECT * FROM ${tabla} WHERE ?`,
            consulta,
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result[0]);

            }
        );

    });

}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    query,
};