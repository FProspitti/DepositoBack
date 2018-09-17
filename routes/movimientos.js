/**
 * Created by Fede on 06/06/2018.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const Movimiento = require('../models/movimientos');



router.get('/movimientos', passport.authenticate('jwt', {session: false}), function(req, res) {
    Movimiento.getEstados(req, function(err,estado) {
        res.send(estado);

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


/*router.put('/deleteEstadp', passport.authenticate('jwt', {session: false}), function(req, res) {
    Estado.deleteEstados(req.body._id, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Estado modificado'});
        }
    })
});

router.put('/updateEstado', passport.authenticate('jwt', {session: false}), function(req, res) {
    Estado.updateEstados(req.body, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Estado modificado'});
        }
    })
});*/



module.exports = router;