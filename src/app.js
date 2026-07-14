const express = require('express');
const config = require('./config');

const usuarios = require('./modulos/usuarios/rutas')

const app = express ();
//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/usuarios', usuarios)
module.exports = app;