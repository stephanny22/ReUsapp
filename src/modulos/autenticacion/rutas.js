const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

router.post('/login', login);

async function login(req, res) {
    try {
        const datos = await controlador.login(
            req.body.email,
            req.body.password
        );

        respuesta.success(req, res, datos, 200);

    } catch (error) {
        respuesta.error(req, res, error.message, 401);
    }
}

module.exports = router;