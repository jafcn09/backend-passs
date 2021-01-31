const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dni:{
    type:String,
    required:true,
    unique:true
  },
  celular: {
    type: String,
    required: true, 
    unique:true
  },
  nacimiento: {
    type: String,
    required: true
  },
  enabled: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USUARIO' 
  },
  tarjeta: {
    type: Schema.Types.ObjectId,
    ref: 'Tarjeta',
    required: true
  }
});

/**modificando _id, _v1 */
UsuarioSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
 
  return object;
})


/**implementamos el modelo
 * exponer hacia fuero para usarlo
 */
module.exports = model('Usuario', UsuarioSchema)