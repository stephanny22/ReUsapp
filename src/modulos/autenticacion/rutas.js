const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router();

router.get('/login', controlador.login);

async function uno(req,res){
    try{
    const items = await controlador.login(req.body.usuario, req.body.contrasena);
        respuesta.token(req, res, items, 200);
    }catch(error){
        respuesta.error(req, res, error, 500);
        
    } 
};


module.exports = router;