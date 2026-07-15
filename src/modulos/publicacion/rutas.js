const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router();
router.get('/', todos);
router.get('/publicas', publicaciones);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);

router.get('/publicas', publicaciones);

async function publicaciones(req,res){
    try{
        const items = await controlador.publicaciones();
        respuesta.success(req,res,items,200);
    }catch(error){
        respuesta.error(req,res,error.message,500);
    }
}

async function todos(req,res){
    try{
    const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    }catch(error){
        respuesta.error(req, res, error, 500);
        
    }
    
    
};

async function uno(req,res){
    try{
    const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(error){
        respuesta.error(req, res, error, 500);
        
    } 
};

async function agregar(req,res){
    try{
    const items = await controlador.agregar(req.body);
    if(!req.body.id){
        mensaje = 'Item guardado con exito';
    }else{
        mensaje = 'Item actualizado con exito';
    }
        respuesta.success(req, res, mensaje, 201);
    }catch(error){
        respuesta.error(req, res, error.message, 500);
        
    } 
};

async function eliminar(req,res){
    try{
    const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, "Item eliminado satisfactoriamente", 200);
    }catch(error){
        respuesta.error(req, res, error, 500);
        
    } 
};
module.exports = router;