const {Schema, model} = require('mongoose');
const TarjetaSchema = Schema ({
    nombre: {
        type: String,
      unique: true
    },
    tipo_tarjeta: {
        type: String,
        required: true
    },
   
    enable: {
        type: String,
        default:3
    },
    usuario: {
        required: true,
        type: Schema.Types,
        ref: 'Usuario'
      }
}, tarjetas = new Schema({ 

}));
Tarjeta: [{type: Schema.Types.ObjectId, ref:'Usuario'}]
module.exports = model('tarjetas', TarjetaSchema);