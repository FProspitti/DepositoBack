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
const Clientes = require('../models/clientes');



router.get('/movimientos', passport.authenticate('jwt', {session: false}), function(req, res) {

    // let cli= new Clientes(req.query.cliente);




    // console.log('Cliente',cli);

     let movimientoFiltro= new Object({
        cliente: req.query.cliente,
        estado: req.query.estado,
        fechaDesde: req.query.fechaDesde,
        fechaHasta: req.query.fechaHasta
    });

     console.log('Filtro',movimientoFiltro);

    Movimiento.getMovimientos(movimientoFiltro, function(err,movimientos) {
        res.send(movimientos);

})
});

router.post('/nuevoMovimiento', (req,res, next) => {

    let newMovimiento= new Movimiento({
         cliente: req.body.cliente,
         estado: req.body.estado,
         fechaIngreso: req.body.fechaIngreso,
    });

    Movimiento.addMovimientos(newMovimiento, (err,user) =>{
    if(err){
        res.json({success: false, msg: 'Error al crear Movimiento'});
    }else{
        res.json({success: true, msg: 'Movimiento creado'});
}
});
});


router.get('/getMovimiento/:id', (req, res, next) => {

    Movimiento.getMovimiento(req.params.id, function(err,movimiento) {
        res.send(movimiento)

    })
});



module.exports = router;