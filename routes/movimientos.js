/**
 * Created by Fede on 06/06/2018.
 */
// import {MovimientosFiltro} from "../models/movimientosFiltro";

const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const Movimiento = require('../models/movimientos');



router.get('/movimientos', passport.authenticate('jwt', {session: false}), function(req, res) {

     let movimientoFiltro= new Object({
        clienteId: req.query.clienteId,
        estadoId: req.query.estadoId,
        fechaDesde: req.query.fechaDesde,
        fechaHasta: req.query.fechaHasta
    });

    Movimiento.getMovimientos(movimientoFiltro, function(err,movimientos) {
        res.send(movimientos);

})
});

router.post('/nuevoMovimiento', (req,res, next) => {
    console.log('movimientoooo: ',req.body)
    let newMovimiento= new Movimiento({
         cliente: req.body.cliente,
         estado: req.body.estado,
         fechaRegistro: req.body.fechaRegistro
    });

    Movimiento.addMovimientos(newMovimiento, (err,movimiento) =>{
    if(err){
        res.json({success: false, msg: 'Error al crear Movimiento'});
    }else{
        res.json({success: true, msg: 'Movimiento creado', mov: movimiento});
}
});
});

router.put('/updateMovimiento', passport.authenticate('jwt', {session: false}), function(req, res) {
    Movimiento.updateMovimientos(req.body, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Estado modificado'});
        }
    })
});


router.get('/getMovimiento/:id', (req, res, next) => {

    Movimiento.getMovimiento(req.params.id, function(err,movimiento) {
        res.send(movimiento)

    })
});



module.exports = router;