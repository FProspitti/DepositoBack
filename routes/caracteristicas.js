/**
 * Created by Fede on 06/06/2018.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const Caracteristica = require('../models/caracteristicas');



router.get('/caracteristicas', passport.authenticate('jwt', {session: false}), function(req, res) {
    Caracteristica.getCaracteristicas(req, function(err,caracteristica1) {
        res.send(caracteristica1);

})
});

router.get('/caracteristicasFiltro', passport.authenticate('jwt', {session: false}), function(req, res) {

    let caracteristicaFiltro= new Object({
        tipo: req.query.tipo
    });

    Caracteristica.getCaracteristicasFiltro(caracteristicaFiltro, function(err,caracteristicas) {
        res.send(caracteristicas);

    })
});

router.post('/nuevaCaracteristica', passport.authenticate('jwt', {session: false}), function(req, res) {
    let newCaracteris = new Caracteristica({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
    });
     Caracteristica.addCaracteristica(newCaracteris, (err, user) => {
            if (!err) {
                res.json({success: true, msg: 'Caracterisitica creada'});
                console.log('ok carac');
            }
        });

});


router.put('/deleteCaracteristica', passport.authenticate('jwt', {session: false}), function(req, res) {
    Caracteristica.deleteCaracteristica(req.body._id, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Caracterisitica modificado'});
        }
    })
});

router.put('/updateCaracteristica', passport.authenticate('jwt', {session: false}), function(req, res) {
    Caracteristica.updateCaracteristica(req.body, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Caracterisitica modificado'});
        }
    })
});


router.get('/getCaracteristica/:id', (req, res, next) => {
    Caracteristica.getCaracteristica(req.params.id, function(err,caracteristica) {
        res.send(caracteristica);
   })
});

router.get('/caracteristicasTipo/:tipo', (req, res, next) => {
    Caracteristica.getCaracteristicasTipo(req.params.tipo, function(err,caracteristicas) {
        res.send(caracteristicas);
    })
});

module.exports = router;