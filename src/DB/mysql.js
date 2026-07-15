//Funciones para consultar base de datos
const mysql = require('mysql2');
const config = require('../config');

const dbdconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function  conMysql() {
    conexion = mysql.createConnection(dbdconfig);    

    conexion.connect((err)=>{
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log('DB Conectada')
        }
    });
    conexion.on('error', err =>{
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla){
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function uno(tabla, id){
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} where id=${id}`, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function agregar(tabla, data){
    if(data && data.id == 0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }

}

function insertar (tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `UPDATE ${tabla} SET ? WHERE id=?`,
            [data, data.id],
            (error, result) => {
                if (error) return reject(error);

                if (result.affectedRows === 0) {
                    return reject(new Error("El registro no existe"));
                }

                resolve(result);
            }
        );
    });
}

function eliminar (tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} where id=?`, data.id, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
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

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    publicaciones
}