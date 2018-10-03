const  mongoose=require('mongoose');
const  bcrypt = require('bcryptjs');
const  config=require('../config/database');
const  hoy=new Date();

const  EstadosSchema = mongoose.Schema({
    nombre : {
        type: String,
        required: true
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

const  Estados= module.exports= mongoose.model('Estados', EstadosSchema) ;

module.exports.getEstados= function (req, callback) {
    const  query = {baja: false, nombre: { '$ne': 'Registro'}}
    Estados.find(query,callback);
}

module.exports.addEstados= function (newEstado, callback) {
    newEstado.fechaAlta=hoy;
    newEstado.save(callback);

}


module.exports.deleteEstados= function (id, res) {
    Estados.findById(id, function(error, estado){
        if(error){
            callback(null,'Error al intentar modificar el Estado.');
        }else{
            var estado = estado;
            estado.fechaBaja = hoy;
            estado.baja=true;
            estado.save(res);
        }
    });
}

module.exports.updateEstados= function (estado1, res) {
    Estados.findById(estado1._id, function(error, estado){
        if(error){
            callback(null,'Error al intentar modificar el Estado.');
        }else{
            var estado = estado;
            estado.nombre=estado1.nombre;
            estado.save(res);
        }
    });
}

module.exports.getEstadoNombre= function (nombre, callback) {
    const  query = {nombre: nombre}
    Estados.findOne(query,callback);
}

module.exports.getEstado= function (id, res) {
    Estados.findById(id).exec(res);
}




