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

}

function agregar(tabla, data){

}

function eliminar (tabla, id){

}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}