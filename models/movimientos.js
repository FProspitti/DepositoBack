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
        ref: 'Clientes'
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estados'
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    fechaIngreso: {
        type: Date,
    },
    fechaSalida: {
        type: Date,
    },
    fechaRegistro: {
        type: Date,
    },
    fechaAlta: {
        type: Date,
    },
    cantDias:{
        type: Number,
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
    Movimientos.find(query,callback).populate({ path: 'cliente', select: 'nombre' }).
    populate({ path: 'estado', select: 'nombre' }).exec(function (err, movi) {
    });
}

module.exports.addMovimientos= function (newMovimiento, res) {

        newMovimiento.fechaAlta=hoy;
        newMovimiento.save(function(err, data) {
            if(err) console.log('Error al guardar movimiento:', err);
            else {
                Movimientos.findById(data._id).populate({ path: 'cliente', select: 'nombre' }).
                populate({ path: 'estado', select: 'nombre' }).exec(res);
            }
        });
}

module.exports.getMovimiento= function (id, callback) {
    const  query = {idMov: id}
    Movimientos.findOne(query,callback);
}

module.exports.updateMovimientos= function (movimiento1, res) {
    console.log('Movimiento actualizad',movimiento1)
    Movimientos.findById(movimiento1._id, function(error, movimiento){
        console.log('Movimiento viejo',movimiento)
        if(error){
            callback(null,'Error al intentar modificar el Estado.');
        }else{
            var movimiento = movimiento;
            movimiento.cliente = movimiento1.cliente,
            movimiento.estado = movimiento1.estado
                if(movimiento1.estado.nombre == 'Ingreso') {
                    console.log('Ingreso');
                    movimiento.fechaIngreso = movimiento1.fecha
                }else  if(movimiento1.estado.nombre == 'Salida'){
                    console.log('Salida');
                    movimiento.fechaSalida = movimiento1.fecha
                }
            movimiento.save(res);
        }
    });
}


