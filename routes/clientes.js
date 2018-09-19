/**
 * Created by Fede on 06/06/2018.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const Cliente = require('../models/clientes');



router.get('/clientes', passport.authenticate('jwt', {session: false}), function(req, res) {
    Cliente.getClientes(req, function(err,cliente1) {
        res.send(cliente1);

})
});

router.post('/nuevoCliente', (req,res, next) => {
    let newCliente= new Cliente({
        nombre: req.body.nombre,
    });

    Cliente.addClientes(newCliente, (err,user) =>{
    if(err){
        res.json({success: false, msg: 'Error al crear cliente'});
    }else{
        res.json({success: true, msg: 'Cliente creada'});
}
});
});


router.put('/deleteCliente', passport.authenticate('jwt', {session: false}), function(req, res) {
    Cliente.deleteClientes(req.body._id, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Cliente modificado'});
        }
    })
});

router.put('/updateCliente', passport.authenticate('jwt', {session: false}), function(req, res) {
    Cliente.updateClientes(req.body, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Cliente modificado'});
        }
    })
});


router.get('/getCliente/:id', (req, res, next) => {
    Cliente.getCliente(req.params.id, function(err,cliente) {
        res.send(cliente);
   })
});



module.exports = router;