/**
 * Created by Fede on 06/06/2018.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const Movimiento = require('../models/movimientos');



router.get('/movimientos/:idCliente', passport.authenticate('jwt', {session: false}), function(req, res) {
    console.log('Llega');

    let obj = new Object();

    obj = req.params.idCliente;

        console.log(obj.cliente);

    let movimientoFiltro= new Object({
        cliente: req.params.idCliente.cliente,
        estado: req.params.idCliente.estado,
        fechaDesde: req.params.idCliente.fechaDesde,
        fechaHasta: req.params.idCliente.fechaHasta
    });

    console.log(movimientoFiltro);
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