const {Schema, model} = require('mongoose');
const TarjetaSchema = Schema ({
    nombre: {
        type: String,
      unique: true
    },
    titular:{
        type:String, 
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
   
    enable: {
        type: String,
        default:1
    },
    usuario: {
        required: true,
        type: Schema.ObjectId,
        ref: 'Usuario'
      }
},);

module.exports = model('tarjetas', TarjetaSchema);