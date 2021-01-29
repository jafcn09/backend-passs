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
    required:true,
    unique:true
},
nacimiento:{
  type: String,
  required: true,
},
  email: {
    type: String,
    required: true,
    unique: true
  },
  celular:{
  type: String,
  required: true,
  unique: true,
  },
  enabled: {
    type: String,
    default: 3
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE' 
  }
});

/**modificando _id, _v1 */
Usuario: [{type: Schema.Types.ObjectId, ref: 'Tarjeta'}]


/**implementamos el modelo
 * exponer hacia fuero para usarlo
 */
module.exports = model('Usuario', UsuarioSchema)