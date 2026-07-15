const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const usuarios = require('./modulos/usuarios/rutas');
const autenticacion = require('./modulos/autenticacion/rutas');
const categoria = require('./modulos/categoria/rutas');
const imagen = require('./modulos/imagen/rutas');
const intercambio = require('./modulos/intercambio/rutas');
const mensaje = require('./modulos/mensaje/rutas');
const producto = require('./modulos/producto/rutas');
const producto_intercambio = require('./modulos/producto_intercambio/rutas');
const publicacion = require('./modulos/publicacion/rutas');
const resenia = require('./modulos/resenia/rutas');
const subcategoria = require('./modulos/subcategoria/rutas');
const tipo_usuario = require('./modulos/tipo_usuario/rutas');



const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', config.app.port);


app.use('/api/usuarios', usuarios);
app.use('/api/auth', autenticacion);
app.use('/api/categoria', categoria);
app.use('/api/imagen', imagen);
app.use('/api/intercambio', intercambio);
app.use('/api/mensaje', mensaje);
app.use('/api/producto', producto);
app.use('/api/producto_intercambio', producto_intercambio);
app.use('/api/publicacion', publicacion);
app.use('/api/resenia', resenia);
app.use('/api/subcategoria', subcategoria);
app.use('/api/tipo_usuario', tipo_usuario);


module.exports = app;