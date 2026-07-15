const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

// CRUD
router.get('/', todos);

// Rutas especiales
router.get('/paneladmin', paneladmin);
router.get('/lista', listarUsuarios);
router.get('/contar', contar);

// Ruta con parámetro (SIEMPRE AL FINAL)
router.get('/:id', uno);

router.post('/', agregar);
router.put('/', eliminar);

//====================
// CRUD
//====================

async function todos(req, res) {

    try {

        const items = await controlador.todos();

        respuesta.success(req, res, items, 200);

    } catch (error) {

        respuesta.error(req, res, error, 500);

    }

}

async function uno(req, res) {

    try {

        const items = await controlador.uno(req.params.id);

        respuesta.success(req, res, items, 200);

    } catch (error) {

        respuesta.error(req, res, error, 500);

    }

}

async function agregar(req, res) {

    try {

        await controlador.agregar(req.body);

        let mensaje;

        if (!req.body.id) {
            mensaje = "Item guardado con éxito";
        } else {
            mensaje = "Item actualizado con éxito";
        }

        respuesta.success(req, res, mensaje, 201);

    } catch (error) {

        respuesta.error(req, res, error.message, 500);

    }

}

async function eliminar(req, res) {

    try {

        await controlador.eliminar(req.body);

        respuesta.success(req, res, "Item eliminado satisfactoriamente", 200);

    } catch (error) {

        respuesta.error(req, res, error, 500);

    }

}


//====================
// ADMINISTRADOR
//====================

async function paneladmin(req, res) {

    try {

        const usuarios = await controlador.totalUsuarios();
        const productos = await controlador.totalProductos();
        const intercambios = await controlador.totalIntercambios();
        const resenas = await controlador.totalResenas();

        respuesta.success(req, res, {
            usuarios,
            productos,
            intercambios,
            resenas
        }, 200);

    } catch (error) {

        respuesta.error(req, res, error, 500);

    }

}
async function contar(req, res) {

    try {

        const items = await controlador.contar();


        respuesta.success(req, res, items, 200);

    } catch (error) {

        respuesta.error(req, res, error, 500);

    }

}

async function listarUsuarios(req, res) {

    try {

        const items = await controlador.usuarios();

        respuesta.success(req, res, items, 200);

    } catch (error) {

        respuesta.error(req, res, error, 500);

    }

}



module.exports = router;