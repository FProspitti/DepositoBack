const  mongoose=require('mongoose');
const  bcrypt = require('bcryptjs');
const  config=require('../config/database');
const  hoy=new Date();
const Schema = mongoose.Schema;

const  ClientesSchema = new Schema({
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

const  Clientes= mongoose.model('clientes', ClientesSchema) ;
module.exports = Clientes;

module.exports.getClientes= function (req, callback) {
    const  query = {baja: false}
    Clientes.find(query,callback);
}

module.exports.addClientes= function (newCliente, callback) {
    newCliente.fechaAlta=hoy;
    newCliente.save(callback);

}


module.exports.deleteClientes= function (id, res) {
    Clientes.findById(id, function(error, cliente){
        if(error){
            callback(null,'Error al intentar modificar el Cliente.');
        }else{
            var cliente = cliente;
            cliente.fechaBaja = hoy;
            cliente.baja=true;
            cliente.save(res);
        }
    });
}

module.exports.updateClientes= function (cliente1, res) {
    Clientes.findById(cliente1._id, function(error, cliente){
        if(error){
            callback(null,'Error al intentar modificar el cliente.');
        }else{
            var cliente = cliente;
            cliente.nombre=cliente1.nombre;
            cliente.save(res);
        }
    });
}





