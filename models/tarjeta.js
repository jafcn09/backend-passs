const {Schema, model} = require('mongoose');
const TarjetaSchema = Schema ({
    nombre: {
        type: String,
        required: true
    },
    dueño: {
        type: String,
        required: true,
        unique:true
    },
    tipo: {
        type: String,
        required: true,
        unique:true
    },
   
    enable: {
        type: String,
        default:1
    },
    usuario: {
        required: true,
        type: Schema.Types,
        ref: 'Usuario'
      }
}, {colection: 'tarjetas'});
TarjetaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = model('tarjetas', TarjetaSchema);