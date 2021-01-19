const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  dni:{
    type: String,
},
nacimiento:{
  type: String,
},
  email: {
    type: String,
    required: true,
    unique: true
  },
  celular:{
  type: String,
  },
  enabled: {
    type: String,
    default: 1
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE' 
  }
});

/**modificando _id, _v1 */
UsuarioSchema.method('toJSON', function() {
  const { __v, _id,password, ...object } = this.toObject();
  object.uid = _id;
  return object;
})


/**implementamos el modelo
 * exponer hacia fuero para usarlo
 */
module.exports = model('Usuario', UsuarioSchema)