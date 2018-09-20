const  mongoose=require('mongoose');
const  bcrypt = require('bcryptjs');
const  config=require('../config/database');
const  hoy=new Date();
const Schema = mongoose.Schema;
var Clientes=require('./clientes');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var  MovimientosSchema = mongoose.Schema({
    idMov:{
        type: Number,
        default: 0,
        unique: true
    },
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


MovimientosSchema.plugin(autoIncrement.plugin, { model: 'Movimientos', field: 'idMov' });

const  Movimientos= mongoose.model('movimientos', MovimientosSchema) ;
module.exports = Movimientos;


module.exports.getMovimientos= function (req, callback) {
    console.log('parametotto: ',req)
    let  query;
     if((req.clienteId == 'T') && (req.estadoId == 'T')){
         query = {baja: false, fechaIngreso: { '$gte': new Date(req.fechaDesde), '$lte': new Date(req.fechaHasta)}};
         console.log('Todos: ')
    } else
        if((req.clienteId != 'T') && (req.estadoId != 'T')){
            query = {baja: false, cliente: req.clienteId, estado: req.estadoId, fechaIngreso: { '$gte': new Date(req.fechaDesde), '$lte': new Date(req.fechaHasta)}};
            console.log('2: ')
     } else
        if((req.clienteId == 'T') && req.estadoId){
            query = {baja: false, estado: req.estadoId, fechaIngreso: { '$gte': new Date(req.fechaDesde), '$lte': new Date(req.fechaHasta)}};
            console.log('3: ')
        } else
        if(req.clienteId && (req.estadoId == 'T')){
            query = {baja: false, cliente: req.clienteId, fechaIngreso: { '$gte': new Date(req.fechaDesde), '$lte': new Date(req.fechaHasta)}};
            console.log('4: ')
        }
    Movimientos.find(query,callback);
}

module.exports.addMovimientos= function (newMovimiento, callback) {

        newMovimiento.fechaAlta=hoy;
        newMovimiento.save(callback);
}

module.exports.getMovimiento= function (id, callback) {
    const  query = {idMov: id}
    Movimientos.findOne(query,callback);
}

