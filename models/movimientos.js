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


module.exports.getMovimientos= function (req, callback) {
    const  query = {baja: false}
    Movimientos.find(query,callback);
}

module.exports.addMovimientos= function (newMovimiento, callback) {

    // newMovimiento.cliente=cl;
    newMovimiento.fechaAlta=hoy;
    newMovimiento.save(callback);

}
