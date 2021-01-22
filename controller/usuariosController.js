const { response } = require('express');

const { generarJWT } = require('../helpers/jwt');


const Usuario = require('../models/usuario')

const getUsuarios = async(req, res) => {
  const desde = Number(req.query.desde) || 0;


  const [ usuarios, total_reg ] = await Promise.all([
    Usuario.find({enabled: '1'},'nombre email role foto enabled google').skip(desde).limit(5),
    Usuario.countDocuments()
  ]);

  res.json({
    ok: true,
    usuarios,
    total_reg
    // uid: req.uid
  });
}

const crearUsuario = async(req, res = response) => {
  const { email,nombre,apellido,dni,celular,nacimiento} = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email,dni,celular,nacimiento });

    if(existeEmail) {
      return res.status(400).json({
        status:400,

        data:{
          ok: 'error',
          msg: 'Este usuario, ya existe.'
        }
        
      });
    }

    const usuario = new Usuario(req.body)
    

    /**generar token JWT */
    const token = await generarJWT(usuario.id);
    
    await usuario.save(); /**es una promesa, puede q lo haga rapido o demore */

    res.json({
 
      status:200,
      data:{
        ok: 'Se hizo bien el registro',
        msg: 'Se creo el usuario.',
        usuario: usuario,
        token
      }
     
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status:500,
      data:{
        ok: 'errror',
        msg: 'Completar los campos por favor.'
      }
     
    })
  }
}

const actualizarUsuario = async(req, res = response) => {
  /**validar token y comprobar si el usuario es correcto */
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if(!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese ID en la DB.'
      })
    }

    /**actualizar data */
    const { dni,  email,nacimiento,celular,...campos } = req.body; /**desestructuramos lo q viene en el request body, campos q no se usaran para actualizar */
    if(usuarioDB.email != email,dni,nacimiento,celular) {
      const existeEmail = await Usuario.findOne({ email, dni, nacimiento, celular});
      if (existeEmail) {
        return res.status(400).json({
          status:400,
          data:{
            ok: false,
            msg: 'ya existe este usuario con estos parametros'
          }
         
        })
      }
    }
    campos.email = email; 
 
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


    res.json({
      status:205,
      data:{

        ok: 'bien',
        msg: 'Se actualizó el usuario correctamente.',
        usuario: usuarioActualizado
      }

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status:500,
      data:{
        msg: 'Error al actualizar usuario'

      }
     
    })
  }
}

const borrarUsuario = async(req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if(!usuarioDB) {
      return res.status(404).json({
        status:404,
        data:{
          msg: 'No existe un usuario con ese codigo en la base de datos'
        }
    
      })
    }
    
    if (usuarioDB.enabled === '1') {
      await Usuario.findByIdAndUpdate(uid, {enabled: '0'}, {new: true});
      res.json({
        ok: true,
        msg: 'Usuario deshabilitado.'
      });
    } else {
      await Usuario.findByIdAndUpdate(uid, {enabled: '1'}, {new: true});
      res.json({
        ok: true,
        msg: 'Usuario habilitado.'
      });
    }
    // 
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error al borrar usuario.' 
    });
  }
}

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
}