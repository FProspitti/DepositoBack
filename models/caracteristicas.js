const  mongoose=require('mongoose');
const  bcrypt = require('bcryptjs');
const  config=require('../config/database');
const  hoy=new Date();
const Schema = mongoose.Schema;


const  CaracteristicasSchema = new Schema({
    nombre : {
        type: String,
        required: true
    },
    tipo : {
        type: Number,
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

const  Caracteristicas= mongoose.model('Caracteristicas', CaracteristicasSchema) ;
module.exports = Caracteristicas;
mongoose.Promise = Promise;

module.exports.getCaracteristicas= function (req, callback) {
    const  query = {baja: false}
    Caracteristicas.find(query,callback);
}

module.exports.getCaracteristicasFiltro= function (req, callback) {
    let  query;
    if(req.tipo == 0){
        query = {baja: false};
    } else{
        query = {baja: false, tipo: req.tipo};
    }
    Caracteristicas.find(query,callback);
}


module.exports.addCaracteristica= function (newCaracteris, callback) {
    newCaracteris.fechaAlta = hoy;
    newCaracteris.save(callback);
}

module.exports.deleteCaracteristica= function (id, res) {
    Caracteristicas.findById(id, function(error, caracteristica){
        if(error){
            callback(null,'Error al intentar modificar la caracteristica');
        }else{
            var caracteristica = caracteristica;
            caracteristica.fechaBaja = hoy;
            caracteristica.baja=true;
            caracteristica.save(res);
        }
    });
}

module.exports.updateCaracteristica= function (caracteristica1, res) {
    Caracteristicas.findById(caracteristica1._id, function (error, caracteristica) {
        if (error) {
            callback(null, 'Error al intentar modificar la caracteristica.');
        } else {
            var caracteristica = caracteristica;
            caracteristica.nombre = caracteristica1.nombre;
            caracteristica.tipo = caracteristica1.tipo;
            caracteristica.save(res);
        }
    });

}
    module.exports.getCaracteristica= function (id, res) {
        Caracteristicas.findById(id).exec(res);
}

module.exports.getCaracteristicasTipo= function (req, callback) {
    let  query = {baja: false, tipo: req};
    Caracteristicas.find(query,callback);
}






