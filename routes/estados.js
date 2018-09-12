/**
 * Created by Fede on 06/06/2018.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const Estado = require('../models/estados');



router.get('/estados', passport.authenticate('jwt', {session: false}), function(req, res) {
    Estado.getEstados(req, function(err,estado) {
        res.send(estado);

})
});

router.post('/nuevoEstado', (req,res, next) => {
    console.log("Fedefdssd");
    console.log(req.body);
    let newEstado= new Estado({
        nombre: req.body.nombre,
    });

    Estado.addEstados(newEstado, (err,user) =>{
    if(err){
        res.json({success: false, msg: 'Error al crear estado'});
    }else{
        res.json({success: true, msg: 'Estado creado'});
}
});
});


router.put('/deleteEstadp', passport.authenticate('jwt', {session: false}), function(req, res) {
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
});



module.exports = router;