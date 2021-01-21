const { response } = require('express');
const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
  const { dni} = req.body;
  try {
    /**verificar email */
    const usuarioDB = await Usuario.findOne({enabled: '1',dni});
    if (!usuarioDB) {
      return res.status(400).json({

       
        status:100,
        data:{
          ok: 'no se reconoce',
          cambio: 'El dni no existe'
        }
        
      });
    }


    res.json({
      status: 200,
      data: {
        ok:  'bienvenido',
        cambio: 'Dni '+usuarioDB.dni + 'exitoso.',
       }

     
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
     
      status: 300,
      data:{
        ok: 'no se reconoce',
        cambio: 'Hable con el administrador.'
      }
      
    });
  }
}



const renewToken = async(req, res = response) => {
  /**generar nuevo token */
  const uid = req.uid;
  const token = await generarJWT(uid);
  /**obtener el usuario por UID */
  const usuario = await Usuario.findById(uid);
  /**por si el usuario esta deshabilitado */
  if (usuario.enabled != 1) {
    return res.status(400).json({
      ok: 'no se reconoce',
      msg: 'El usuario no existe.' /**usuario deshabilitado*/
    });
  }

  res.json({
    ok: true,
    token,
    usuario
  })
}

module.exports = {
  login,
  renewToken
}