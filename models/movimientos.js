const  mongoose=require('mongoose');
const  bcrypt = require('bcryptjs');
const  config=require('../config/database');
const  hoy=new Date();
const Schema = mongoose.Schema;
var Clientes=require('./clientes');



const  MovimientosSchema = mongoose.Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "Clientes"
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: "estados"
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    fechaIngreso: {
        type: Date,
    },
    fechaAlta: {
        type: Date,
    },
    baja: {
        type: Boolean,
        default: false
    },
    fechaBaja: {
        type: Date,
    }
});

const  Movimientos= mongoose.model('movimientos', MovimientosSchema) ;
module.exports = Movimientos;
// const  Cliente= module.exports= mongoose.model('clientes', clientesSchema) ;
// const  Estado= module.exports= mongoose.model('estados', EstadosSchema) ;
// const  User= module.exports= mongoose.model('user', UserSchema) ;

module.exports.getMovimientos= function (req, callback) {
    const  query = {baja: false}
    Movimientos.find(query,callback);
}

module.exports.addMovimientos= function (newMovimiento, callback) {

    var cl=new Clientes({
        _id:'5b90112ecbea4833005b9105',
        nombre:'Raul'
    });

    newMovimiento.cliente=cl;
    newMovimiento.fechaAlta=hoy;
    newMovimiento.save(callback);

}


// module.exports.deleteEstados= function (id, res) {
//     Estados.findById(id, function(error, estado){
//         if(error){
//             callback(null,'Error al intentar modificar el Estado.');
//         }else{
//             var estado = estado;
//             estado.fechaBaja = hoy;
//             estado.baja=true;
//             estado.save(res);
//         }
//     });
// }
//
// module.exports.updateEstados= function (estado1, res) {
//     Estados.findById(estado1._id, function(error, estado){
//         if(error){
//             callback(null,'Error al intentar modificar el Estado.');
//         }else{
//             var estado = estado;
//             estado.nombre=estado1.nombre;
//             estado.save(res);
//         }
//     });
// }








