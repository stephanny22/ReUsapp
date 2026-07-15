const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const usuarios = require('./modulos/usuarios/rutas')
const categoria = require('./modulos/categoria/rutas');
const chat = require('./modulos/chat/rutas');
const imagen = require('./modulos/imagen/rutas');
const intercambio = require('./modulos/intercambio/rutas');
const mensaje = require('./modulos/mensaje/rutas');
const producto = require('./modulos/producto/rutas');
const producto_intercambio = require('./modulos/producto_intercambio/rutas');
const publicacion = require('./modulos/publicacion/rutas');
const resenia = require('./modulos/resenia/rutas');
const subcategoria = require('./modulos/subcategoria/rutas');
const tipo_usuario = require('./modulos/tipo_usuario/rutas');
const autenticacion = require('./modulos/autenticacion/rutas');
const path = require('path');

const app = express ();
//Middleware visualizacion de peticiones
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/usuarios', usuarios);
app.use('/api/auth', autenticacion);
app.use('/api/categoria', categoria);
app.use('/api/chat', chat);
app.use('/api/imagen', imagen);
app.use('/api/intercambio', intercambio);
app.use('/api/mensaje', mensaje);
app.use('/api/producto', producto);
app.use('/api/producto_intercambio', producto_intercambio);
app.use('/api/publicacion', publicacion);
app.use('/api/resenia', resenia);
app.use('/api/subcategoria', subcategoria);
app.use('/api/tipo_usuario', tipo_usuario);
app.use(express.static(path.join(__dirname, '../vistas')));

module.exports = app;